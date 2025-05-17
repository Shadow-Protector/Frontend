import Moralis from "moralis";

const data = process.env.MORALIS_API_KEY;

await Moralis.start({
  apiKey: data,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chain = searchParams.get("chain");
  const address = searchParams.get("address");

  if (address) {
    console.log(chain, address);
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      chain: "0x2105",
      excludeSpam: true,
      address: address,
    });
    return Response.json(response.toJSON());
  }

  return Response.json({});
}
