export default function Verify1() {
  return (
    <div className="overflow-hidden text-center h-screen grid items-center  relative">
      <div className="grid gap-5 mx-auto">
        <div className="bg-bt/50 p-10 rounded-dd">
          <div className="font-kan text-4xl text-black pb-20  text-l2 grid gap-10">
            <div className="animate-pulse"> Verify your answers:</div>
            <div>
              <div className="font-kan text-2xl text-l1 ">1. Tool used to interact with Daps and smart contracts:</div>
              <div className="grid items-center pl-3 font-kum text-5xl text-black text-l2 animate-pulse">Wallet</div>
            </div>
            <div>
              <div className="font-kan text-2xl text-l1 ">2. Your wallet has two keys, which one is safe to share?</div>
              <div className="grid items-center pl-3 font-kum text-5xl text-black text-l2 animate-pulse">
                Public keys
              </div>
            </div>
            <div>
              <div className="font-kan text-2xl text-l1 ">3. You should REALLY keep this secret and private:</div>
              <div className="grid items-center pl-3 font-kum text-5xl text-black text-l2 animate-pulse">
                Private Keys
              </div>
            </div>
          </div>
          <div className="homeBT">Verify answers</div>
        </div>
      </div>
    </div>
  );
}
