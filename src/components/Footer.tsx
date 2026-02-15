const Footer = () => (
  <footer className="border-t border-border py-8 px-6">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <p>© 2026 Ness API</p>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-method-get animate-pulse" />
        All systems operational
      </div>
    </div>
  </footer>
);

export default Footer;
