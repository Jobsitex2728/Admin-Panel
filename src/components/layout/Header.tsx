
export default function Header({ title }: { title?: string }) {
  return (
    <header className="ml-64  bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <h1 className="text-xl font-semibold">{title}</h1>
    </header>
  );
}