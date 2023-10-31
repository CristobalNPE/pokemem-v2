type Props = {
  children: React.ReactNode;
  showPopover: boolean;
};

function Popover({ children, showPopover }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`${
        showPopover ? "grid" : "hidden"
      } bg-zinc-900/50 backdrop-blur-sm  absolute inset-0 z-50  place-content-center`}
    >
      <div className="w-full sm:min-w-[30rem] min-h-[25rem] bg-zinc-900 rounded-lg shadow-xl p-8 flex flex-col items-center text-center">
        {children}
      </div>
    </div>
  );
}

export default Popover;
