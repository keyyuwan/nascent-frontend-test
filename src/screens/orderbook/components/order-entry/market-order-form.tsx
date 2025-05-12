import { Controller, FormProvider } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Separator } from "../../../../components/ui/separator";
import { Slider } from "../../../../components/ui/slider";
import {
  type MarketOrderFormData,
  useMarketOrderForm,
} from "../../../../hooks/use-market-order-form";
import { useOrderbookStore } from "../../../../store/orderbook/use-orderbook-store";
import type { Asset } from "../../../../utils/assets-images";
import { USDInput } from "../../../../components/ui/usd-input";
import { usePlaceOrder } from "../../../../hooks/use-place-order";
import { unmaskUSD } from "../../../../utils/unmask-usd";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface MarketOrderFormProps {
  asset: Asset;
  side: "buy" | "sell";
}

export function MarketOrderForm({ asset, side }: MarketOrderFormProps) {
  const { orderbook } = useOrderbookStore();
  const { formMethods, handleSlideChange } = useMarketOrderForm();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    reset,
  } = formMethods;

  const { mutateAsync: placeOrderFn } = usePlaceOrder();

  async function handlePlaceMarketOrder(data: MarketOrderFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await placeOrderFn({
        asset,
        side,
        quantity: data.amount,
        type: "market",
        notional: unmaskUSD(data.total),
      });

      toast.success("Order placed successfully!");
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log({ error });
        return toast.error(error.response?.data.message);
      }

      toast.error(
        "Something went wrong while placing your order. Please try again shortly."
      );
    }
  }

  const amount = watch("amount");
  const upperCaseAssetName = asset.toUpperCase();

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={handleSubmit(handlePlaceMarketOrder)}
        className="mt-4 flex flex-col gap-6 w-full"
      >
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="amount">Amount ({upperCaseAssetName})</Label>
          <Controller
            control={control}
            name="amount"
            render={({ field }) => (
              <Input
                id="amount"
                type="number"
                value={field.value}
                onChange={field.onChange}
                max={1}
                min={0}
                step={0.01}
                defaultValue={0}
                errorMessage={errors.amount?.message}
              />
            )}
          />
          <span className="text-xs text-zinc-500">
            Specify how many units you want to {side}.
          </span>
          <Slider
            max={1}
            step={0.01}
            className="mt-2"
            value={[amount]}
            onValueChange={(value) => handleSlideChange(value[0])}
          />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="total">Total (USD)</Label>
          <USDInput name="total" errorMessage={errors.total?.message} />
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">EST. AVERAGE PRICE</span>
          <span className="text-xs text-zinc-700 font-medium">
            {orderbook?.midMarketPrice}
          </span>
        </div>

        <Button
          size="lg"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="capitalize over:brightness-90"
        >
          {side} {upperCaseAssetName}
        </Button>
      </form>
    </FormProvider>
  );
}
