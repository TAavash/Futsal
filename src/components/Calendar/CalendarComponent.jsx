import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FiSearch } from "react-icons/fi";

// Ensure that myEventsList is defined or imported correctly
const myEventsList = [
  // Your events here
];

const CalendarComponent = (props) => {
  const localizer = momentLocalizer(moment);

  return (
    <div className="w-full h-full ">
      <div className="w-[100%] h-[20%] bg-[#F5F5F5] px-[50px] py-[30px] rounded-tr-2xl">
        <div className="w-full h-full flex justify-evenly p-[10px] gap-[5px]">
        <div className="w-[100%] h-full flex-col">
            <div className="w-full h-auto text-start text-3xl p-1">
              Calendar
            </div>

            <div className="w-full h-auto text-start text-2xl text-gray-600 p-1">
              View calendar
            </div>
          </div>
        </div>

        <div className='flex justify-center m-2'>
          <div className="flex w-[500px] items-center gap-1">
            <FiSearch className="h-5 w-5 ml-1" />
            <input type="text" placeholder='Search' className='p-1 w-[500px]  border-hidden focus:outline-none'
            />
          </div>
        </div>

      </div>
      <div className="flex-col h-[80%] p-[30px] gap-[30px] bg-white rounded-br-2xl overflow-y-auto scroll-smooth scrollbar-thin">
        <div className=" grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-[30px] my-2"></div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
