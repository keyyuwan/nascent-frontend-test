import { Controller, FormProvider } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Slider } from "../../../../components/ui/slider";
import { USDInput } from "../../../../components/ui/usd-input";
import {
  type LimitOrderFormData,
  useLimitOrderForm,
} from "../../../../hooks/use-limit-order-form";
import type { Asset } from "../../../../utils/assets-images";
import { usePlaceOrder } from "../../../../hooks/use-place-order";
import { toast } from "sonner";
import { unmaskUSD } from "../../../../utils/unmask-usd";
import { AxiosError } from "axios";

interface LimitOrderFormProps {
  asset: Asset;
  side: "buy" | "sell";
}

export function LimitOrderForm({ asset, side }: LimitOrderFormProps) {
  const { formMethods, handleSlideChange } = useLimitOrderForm();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
    reset,
  } = formMethods;

  const { mutateAsync: placeOrderFn } = usePlaceOrder();

  async function handlePlaceLimitOrder(data: LimitOrderFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await placeOrderFn({
        asset,
        side,
        quantity: Number(data.amount),
        type: "limit",
        notional: unmaskUSD(data.total),
        price: unmaskUSD(data.price),
      });

      toast.success("Order placed successfully!");
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
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
        onSubmit={handleSubmit(handlePlaceLimitOrder)}
        className="mt-4 flex flex-col gap-6 w-full"
      >
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="price">Price (USD)</Label>
          <USDInput name="price" errorMessage={errors.price?.message} />
          <span className="text-xs text-zinc-500">
            {side === "buy"
              ? "Enter the price you're willing to pay."
              : "Enter the price you're willing to accept."}
          </span>
        </div>

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
            value={[Number(amount)]}
            onValueChange={(value) => handleSlideChange(value[0])}
          />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="total">Total (USD)</Label>
          <USDInput name="total" errorMessage={errors.total?.message} />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="capitalize hover:brightness-90"
        >
          {side} {upperCaseAssetName}
        </Button>
      </form>
    </FormProvider>
  );
}
