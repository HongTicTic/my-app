import type { PublicProduct } from "../types";

interface ProductCardProps {
  product: PublicProduct;
  onToggleSale: (id: number) => void;
  currencySymbol?: string;
}

export default function ProductCard({
  product,
  onToggleSale,
  currencySymbol,
}: ProductCardProps) {
  return (
    <li className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base! font-medium!">{product.name}</h2>
        <span
          className={
            product.inStock
              ? "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
              : "rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600"
          }
        >
          {product.inStock ? "In stock" : "Sold out"}
        </span>
      </div>
      <p className="text-lg">
        {currencySymbol ?? "$"}
        {product.price.toFixed(2)}
      </p>
      <button
        type="button"
        onClick={() => onToggleSale(product.id)}
        className="mt-auto self-start rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
      >
        {product.onSale ? "Remove sale" : "Mark on sale"}
      </button>
    </li>
  );
}