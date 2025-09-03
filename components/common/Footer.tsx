export function Footer() {
  return (
    <footer className="border-t border-black/10 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-600">
        <p>All installations by Licensed Electrical Contractors. ESA permit filed before work begins.</p>
        <div className="mt-4 text-xs">© {new Date().getFullYear()} ConnectEV Inc.</div>
      </div>
    </footer>
  );
}

