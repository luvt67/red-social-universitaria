function btnHome({ onClick }: { onClick: () => void })
{
    return (
        <div
            onClick={onClick}
            className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition"
        >
        <h1 className="text-lg font-semibold">Home</h1>
        </div>
    );
}
export default btnHome;