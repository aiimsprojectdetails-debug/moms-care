export default function ReportHeader() {
  return (
    <div className="border-b-2 border-pink-600 pb-6 mb-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-pink-600">
            Mom's Care
          </h1>

          <p className="text-gray-600 mt-2">
            Maternal Healthcare Management System
          </p>

        </div>

        <div className="text-right">

          <h2 className="text-2xl font-semibold">
            Patient Report
          </h2>

          <p className="text-gray-500">
            {new Date().toLocaleDateString()}
          </p>

        </div>

      </div>

    </div>
  );
}