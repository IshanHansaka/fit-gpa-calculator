const Footer = () => {
  return (
    <footer className="mt-8 text-center text-gray-300 text-sm">
      <div className="container mx-auto px-4 text-center">
        Developed with ❤️ by{' '}
        <a
          href="https://github.com/IshanHansaka"
          className="text-fuchsia-500 hover:underline font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ishan Hansaka Silva
        </a>
        <br />
        <div className="text-sm">
          &copy; {new Date().getFullYear()} <strong>GPA Calculator</strong>{' '}
          Faculty of Information Technology, UoM. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
