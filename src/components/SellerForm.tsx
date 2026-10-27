import { useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "../lib/supabase";

const categories = [
  "Electronics",
  "Fashion",
  "Digital goods",
  "Home & living",
  "Collectibles",
  "Other",
];

interface SellerFormProps {
  sellerAccountId: string;
  onPublished: () => void;
}

export default function SellerForm({
  sellerAccountId,
  onPublished,
}: SellerFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priceNear, setPriceNear] = useState("");
  const [category, setCategory] = useState("Other");
  const [quantity, setQuantity] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!sellerAccountId) {
      setMessage("Connect your NEAR wallet before listing a product.");
      return;
    }

    const price = Number(priceNear);
    const stock = Number(quantity);

    if (!Number.isFinite(price) || price <= 0) {
      setMessage("Enter a valid price greater than zero.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 1) {
      setMessage("Quantity must be at least one.");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("products").insert({
        seller_account_id: sellerAccountId,
        title: title.trim(),
        description: description.trim(),
        price_near: price,
        category,
        quantity: stock,
        status: "draft",
      });

      if (error) {
        console.error("Product submission failed:", error.message);
        setMessage(
          "We couldn't save this listing. Seller authentication must be configured before publishing."
        );
        return;
      }

      setTitle("");
      setDescription("");
      setPriceNear("");
      setCategory("Other");
      setQuantity("1");
      setMessage("Draft saved successfully.");
      onPublished();
    } catch (error) {
      console.error("Unexpected listing error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="seller-form">
      <label>
        Product name
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          maxLength={120}
          placeholder="Enter product name"
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
          maxLength={3000}
          placeholder="Describe your product"
          rows={4}
        />
      </label>

      <label>
        Price in NEAR
        <input
          type="number"
          min="0.00000001"
          step="any"
          value={priceNear}
          onChange={(event) => setPriceNear(event.target.value)}
          required
          placeholder="0.00"
        />
      </label>

      <label>
        Category
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label>
        Available quantity
        <input
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          required
        />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save product draft"}
      </button>

      {message && <p role="status">{message}</p>}
    </form>
  );
}
