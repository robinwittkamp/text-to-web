import { faCheck, faSort } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

const ListBox = ({ options, selected, setSelected }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Label className="block text-sm font-medium text-neutral-400">
          Selected model
        </Listbox.Label>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-pointer rounded-xl border border-neutral-300 bg-neutral-100 py-2 pl-4 pr-12 text-left focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white  focus-visible:ring-offset-2">
            <span className="block truncate text-base font-medium text-neutral-700">
              {selected.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <FontAwesomeIcon icon={faSort} className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute -top-2 max-h-64 w-full -translate-y-full divide-y overflow-auto rounded-xl bg-white shadow-lg ring-1 ring-neutral-300 focus:outline-none">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-3 pl-10 pr-4 text-base ${
                      active ? 'bg-blue-100 text-blue-900' : 'text-neutral-900'
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <FontAwesomeIcon icon={faCheck} className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
};

ListBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  selected: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default ListBox;
