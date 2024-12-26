const Footer = () => {
  return (
    <footer className="mt-8 text-center text-gray-600 dark:text-gray-300 text-sm">
      <div className="container mx-auto px-4 text-center">
        <div className="text-sm">
          &copy; {new Date().getFullYear()} <strong>GPA Calculator</strong>{' '}
          Faculty of Information Technology, UoM. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
