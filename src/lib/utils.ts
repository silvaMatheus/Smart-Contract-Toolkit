import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUrl(path?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const normalizedPath =
    path && !path.startsWith("/") ? `/${path}` : path || "";
  return `${baseUrl}${normalizedPath}`;
}

export function truncateAddress(
  address: string,
  charsToShow: number = 4
): string {
  if (address.length <= charsToShow * 2) {
    return address;
  }
  return `${address.slice(0, charsToShow)}...${address.slice(-charsToShow)}`;
}
export const tap = async <T>(
  value: T,
  cb: (value: T) => Promise<unknown>
): Promise<T> => {
  await cb(value);
  return value;
};

export const validateABI = (abi: string): boolean => {
  try {
    const parsedABI = JSON.parse(abi);
    return (
      Array.isArray(parsedABI) &&
      parsedABI.some(
        (entry) =>
          typeof entry === "object" && "type" in entry && "name" in entry
      )
    );
  } catch {
    return false;
  }
};
