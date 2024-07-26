// Display that nice 404 picture
export const NotFoundMessage = ({ message }: { message?: string }) => {
  return (
    <div className="relative h-full flex items-center justify-center bg-amber-100">
      <img src="/assets/images/404.jpg" alt="Not found" width="500"/>
      <p className="absolute text-center text-white bg-black bg-opacity-50 p-4 rounded">
        {message ? message : "Page not found!"}
      </p>
    </div>
  )
}