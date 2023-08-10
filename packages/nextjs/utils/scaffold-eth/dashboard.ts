import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

export const tap = async <T>(value: T, cb: (value: T) => Promise<unknown>): Promise<T> => {
  await cb(value);
  return value;
};

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const truncateAddr = (address?: string, separator = "…") => {
  if (!address) return "";

  const match = address.match(/^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);

  if (!match) return address;
  return `${match[1]}${separator}${match[2]}`;
};

export const getAddressFromENS = async (name: string): Promise<string | null> => {
  if (!name.includes(".")) return null;

  const client = createPublicClient({
    chain: mainnet,
    transport: http(
      process.env.NEXT_PUBLIC_INFURA_ID && `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    ),
  });

  return client.getEnsAddress({ name: normalize(name) });
};
