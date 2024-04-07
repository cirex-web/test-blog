import { redirect } from "next/navigation";
export default async function Home({ params }: any) {
  redirect(
    "https://docs.google.com/forms/d/e/1FAIpQLSfYigxadVdDW-NhbEo7sGFXQ9YrV1UVtcQi1srjbKKE8UsIFQ/viewform?usp=sf_link"
  );
}
