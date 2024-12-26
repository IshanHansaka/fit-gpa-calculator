const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Faculty of Information Technology,
          University of Moratuwa. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
