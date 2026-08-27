const Footer = () => {
  return (
    <footer className="footer grid gap-8 bg-base-200 px-6 py-12 text-base-content md:grid-cols-4 sm:px-10">
      <nav>
        <h6 className="footer-title font-serif text-xl font-semibold normal-case">Services</h6>
        <a className="link link-hover text-base-content/70">Branding</a>
        <a className="link link-hover text-base-content/70">Design</a>
        <a className="link link-hover text-base-content/70">Marketing</a>
        <a className="link link-hover text-base-content/70">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title font-serif text-xl font-semibold normal-case">Company</h6>
        <a className="link link-hover text-base-content/70">About us</a>
        <a className="link link-hover text-base-content/70">Contact</a>
        <a className="link link-hover text-base-content/70">Jobs</a>
        <a className="link link-hover text-base-content/70">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title font-serif text-xl font-semibold normal-case">Legal</h6>
        <a className="link link-hover text-base-content/70">Terms of use</a>
        <a className="link link-hover text-base-content/70">Privacy policy</a>
        <a className="link link-hover text-base-content/70">Cookie policy</a>
      </nav>
      <form className="md:justify-self-end">
        <h6 className="footer-title font-serif text-xl font-semibold normal-case">Newsletter</h6>
        <fieldset className="w-full max-w-80">
          <label className="mb-3 block text-sm text-base-content/70">Enter your email address</label>
          <div className="join w-full">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered join-item w-full bg-base-100"
            />
            <button className="btn btn-primary join-item rounded-r-full px-5 normal-case">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
};

export default Footer;
