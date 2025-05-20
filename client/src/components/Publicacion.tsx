import default_foto from '../assets/default_perfil.png';

function Publicacion() {
  return (
    <div className="border border-gray-300 shadow-md rounded-xl p-4  w-full mx-auto mb-4 bg-white hover:bg-gray-50 transition">
      <div className="flex gap-3">
        <img
          src="https://i.pravatar.cc/100"
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold">Juan Pérez</span>
            <span className="text-gray-500">@juanp</span>
            <span className="text-gray-400">· 14 may</span>
          </div>
          <p className="text-base mt-1 whitespace-pre-wrap">
            ¡Qué buen día para programar en React! ⚛️🔥
          </p>
          <img
            src={default_foto || "https://source.unsplash.com/random/600x400"}
            alt="imagen publicacion"
            className="rounded-2xl mt-3 w-full object-contain aspect-video"
            />
          <div className="flex justify-between mt-4 text-gray-600 text-sm max-w-md">
            <button className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
              💬 <span>Comentar</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
              🔁 <span>Retwittear</span>
            </button>
            <button className="flex items-center gap-1 hover:text-pink-500 cursor-pointer">
              ❤️ <span>Me gusta</span>
            </button>
            <button className="flex items-center gap-1 hover:text-gray-800 cursor-pointer">
              📤 <span>Compartir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publicacion;
