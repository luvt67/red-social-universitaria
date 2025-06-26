function Etiquetas() {
  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e7edf4] pl-4 pr-4">
            <p className="text-[#0d141c] text-sm font-medium leading-normal">All</p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e7edf4] pl-4 pr-4">
            <p className="text-[#0d141c] text-sm font-medium leading-normal">Friends</p>
        </div>
        <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#e7edf4] pl-4 pr-4">
            <p className="text-[#0d141c] text-sm font-medium leading-normal">Groups</p>
        </div>
    </div>

  );
}

export default Etiquetas;
