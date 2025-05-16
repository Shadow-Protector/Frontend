import Moralis from "moralis";

const data = process.env.MORALIS_API_KEY;

await Moralis.start({
  apiKey: data,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chain = searchParams.get("chain");
  const address = searchParams.get("address");
  console.log(chain, address);
  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    chain: "0xa4b1",
    excludeSpam: true,
    address: "0xE451141fCE63EB38e85F08a991fC5878Ee6335b2",
  });
  return Response.json(response.toJSON());
}
