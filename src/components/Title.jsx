const Title = ( { link, alt, title } ) => {
  return (
    <div className="w-full relative h-[30vh]">
        <img 
          src={link}
          alt={alt} 
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="flex justify-center items-center h-full relative z-10 text-white">
          <h2 className="font-bold text-5xl">
            {title}
          </h2>
        </div>
    </div>
  )
}

export default Title

