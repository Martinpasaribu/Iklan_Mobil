"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listbox, Transition, Combobox } from "@headlessui/react";

import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]); // State for storing the selected option

  const handleChange = (e: { title: string; value: string } | null) => {
    if (e) {
      setSelected(e);
      handleUpdateParams(e);
    }
  };
  
  
  // update the URL search parameters and navigate to the new URL
  const handleUpdateParams = (e: { title: string; value: string } ) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPathName);
  };

  return (
    <div className='w-fit'>
      <Combobox
        value={selected}
        onChange={handleChange}
      >
        <div className='relative w-fit z-10'>
          {/* Button for the listbox */}
          <Combobox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image src='/chevron-up-down.svg' width={20} height={20} className='ml-4 object-contain' alt='chevron_up-down' />
          </Combobox.Button>
          {/* Transition for displaying the options */}
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Combobox.Options className='custom-filter__options'>
              {/* Map over the options and display them as listbox options */}
              {options.map((option) => (
                <Combobox.Option
                  key={option.title}
                  className={({ active  }) =>
                    `relative cursor-default select-none py-2 px-4 ${ active  ? "bg-primary-blue text-white " : "text-gray-900"
                    }`
                  }
                  value={option}
                  // onMouseEnter={() => console.log("Hovered: ", option.title)}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`} >
                        {option.title}
                      </span>
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}