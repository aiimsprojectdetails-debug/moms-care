"use client";

export default function PatientTimeline({
  patient,
  ancVisits,
  appointments,
  medicines,
  deliveries,
}) {
  const events = [];

  /* ===========================
        Patient Registration
  =========================== */

  if (patient) {
    events.push({
      date: patient.createdAt,
      icon: "👤",
      title: "Patient Registered",
      description: `${patient.fullName} registered in the system.`,
    });
  }

  /* ===========================
        ANC Visits
  =========================== */

  ancVisits.forEach((visit) => {
    events.push({
      date: visit.createdAt,
      icon: "❤️",
      title: "ANC Visit",
      description: `Week ${visit.pregnancyWeek} • BP: ${
        visit.bloodPressure || "N/A"
      }`,
    });
  });

  /* ===========================
        Appointments
  =========================== */

  appointments.forEach((appointment) => {
    events.push({
      date: appointment.createdAt,
      icon: "📅",
      title: "Appointment",
      description: `${appointment.doctorName || "Doctor"} • ${
        appointment.status
      }`,
    });
  });

  /* ===========================
        Medicines
  =========================== */

  medicines.forEach((medicine) => {
    events.push({
      date: medicine.createdAt,
      icon: "💊",
      title: "Medicine Prescribed",
      description: medicine.medicineName,
    });
  });

  /* ===========================
        Deliveries
  =========================== */

  deliveries.forEach((delivery) => {
    events.push({
      date: delivery.createdAt,
      icon: "👶",
      title: "Delivery",
      description: `${delivery.deliveryType} • Baby: ${delivery.babyGender}`,
    });
  });

  /* ===========================
        Sort by Date
  =========================== */

  events.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6">

      <h2 className="text-2xl font-bold text-pink-600 mb-8">
        Patient Timeline
      </h2>

      {events.length === 0 ? (

        <p className="text-gray-500">
          No timeline available.
        </p>

      ) : (

        <div className="space-y-6">

          {events.map((event, index) => (

            <div
              key={index}
              className="flex items-start gap-4"
            >

              {/* Icon */}

              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-2xl">

                {event.icon}

              </div>

              {/* Timeline */}

              <div className="flex-1 border-l-2 border-pink-200 pl-6">

                <h3 className="font-bold text-lg">

                  {event.title}

                </h3>

                <p className="text-gray-600 mt-1">

                  {event.description}

                </p>

                <p className="text-sm text-gray-400 mt-2">

                  {new Date(
                    event.date
                  ).toLocaleString()}

                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}