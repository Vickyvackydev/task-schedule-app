import React from "react";
import { useAppQuery } from "../../../src/context/AppContext";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaEllipsisH, FaPen, FaTrash } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";

interface DropDownProps {
  handledelete: any;
  handleEdit: any;
  handleView: any;
}
export default function Dropdown(props: DropDownProps) {
  const { tab } = useAppQuery();
  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#FCFDFE] data-[open]:bg-[#FCFDFE] data-[focus]:outline-1 data-[focus]:outline-white">
          <FaEllipsisH className="lg:size-4 size-2 text-gray-400" />
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="w-52 origin-top-right rounded-xl border border-white/5 bg-[#FCFDFE] p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-sm"
        >
          {tab === "lists" && (
            <MenuItem>
              <button
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-blue-500 lg:text-sm text-xs"
                onClick={props.handleEdit}
              >
                <FaPen className="lg:size-4 size-2 " />
                Edit
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                  ⌘E
                </kbd>
              </button>
            </MenuItem>
          )}
          {tab === "lists" && (
            <MenuItem>
              <button
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-blue-500 lg:text-sm text-xs"
                onClick={props.handleView}
              >
                <MdVisibility className="lg:size-4 size-2 " />
                View
                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                  ⌘A
                </kbd>
              </button>
            </MenuItem>
          )}
          <MenuItem>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-blue-500 text-xs lg:text-sm"
              onClick={props.handledelete}
            >
              <FaTrash className="lg:size-4 size-2 " />
              Delete
              <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                ⌘D
              </kbd>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
}
