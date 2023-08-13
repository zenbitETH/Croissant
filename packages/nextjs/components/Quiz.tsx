export default function Quiz() {
  return (
    <div className="overflow-hidden text-center h-screen grid items-center  relative">
      <div className="grid gap-5 mx-auto">
        <div className="bg-bt/50 p-10 rounded-dd">
          <div className="font-kan text-4xl text-black ">Tool used to interact with Daps and smart contracts:</div>
          <div className="grid grid-cols-3 pt-10 gap-5 ">
            <span className="flex itemx-center">
              <input type="radio" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Hammer</div>
            </span>
            <span className="flex itemx-center">
              <input type="radio" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">E-mail</div>
            </span>
            <span className="flex itemx-center">
              <input type="radio" name="radio-1" className="radio" checked />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Wallet</div>
            </span>
          </div>
        </div>
        <div className="bg-bt/50 p-10 rounded-dd">
          <div className="font-kan text-4xl text-black ">Your wallet has two keys, which one is safe to share?</div>
          <div className="grid grid-cols-3 pt-10 gap-5 ">
            <span className="flex itemx-center">
              <input type="radio" name="radio-1" className="radio" checked />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Public Key</div>
            </span>
            <span className="flex itemx-center">
              <input type="radio" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Telephone number</div>
            </span>
            <span className="flex itemx-center">
              <input type="radio" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Personal data</div>
            </span>
          </div>
        </div>
        <div className="bg-bt/50 p-10 rounded-dd">
          <div className="font-kan text-4xl text-black ">You should REALLY keep this secret and private:</div>
          <div className="grid grid-cols-3 pt-10 gap-5 ">
            <span className="flex itemx-center">
              <input type="radio" name="radio-1" className="radio" />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">My eyeballs</div>
            </span>
            <span className="flex itemx-center">
              <input type="radio" name="radio-1" className="radio" checked />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Private key</div>
            </span>
            <span className="flex itemx-center">
              <input type="radio" name="radio-1" className="radio" checked />
              <div className="grid items-center pl-3 font-kum text-2xl text-black">Best memes</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
