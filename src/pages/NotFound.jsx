const NotFound = () => {
  return (
    <div className="hero min-h-[60vh] px-5 py-12">
      <div className="hero-content text-center">
        <div className="card bg-base-200 max-w-md shadow-xl">
          <div className="card-body items-center gap-5 p-8 sm:p-10">
            <div className="badge badge-error badge-outline rounded-full">
              404
            </div>
            <img
              src="https://media.tenor.com/nEP6ovplEd8AAAAj/so-really.gif"
              alt="Page not found"
              className="h-64 w-64 object-contain"
            />
            <h1 className="font-serif text-4xl font-semibold">
              The page you requested does not exist.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
