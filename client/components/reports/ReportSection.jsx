export default function ReportSection({

  title,

  children,

}) {

  return (

    <div className="mb-8">

      <h2
        className="
          text-2xl
          font-bold
          text-pink-600
          border-b-2
          border-pink-200
          pb-2
          mb-4
        "
      >

        {title}

      </h2>

      <div
        className="
          bg-white
          rounded-xl
          border
          border-gray-200
          p-5
        "
      >

        {children}

      </div>

    </div>

  );

}