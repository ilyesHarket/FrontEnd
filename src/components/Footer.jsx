const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h4>MyShop</h4>
        <p>
          Boutique en ligne – Produits de qualité, service client réactif.
          <br />
          &copy; {new Date().getFullYear()} MyShop. Tous droits réservés.
        </p>
      </div>
      <div className="footer-section">
        <h5>Navigation</h5>
        <ul>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/categories">Catégories</a>
          </li>
          <li>
            <a href="/about">À propos</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>Suivez-nous</h5>
        <div className="footer-socials">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
