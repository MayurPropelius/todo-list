import React from "react";
import {TodoListType} from "@/types/common.types";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ListItemsProps {
  index: number
  data: TodoListType
  onChange: (e: any, index: number) => void
  handleEdit: (index: number) => void
}

const ListItems: React.FC<ListItemsProps> = ({handleEdit, data, onChange, index}) => {
  let formattedData = data.createdDate.toDateString();

  return (
    <div className="flex px-3 items-center todo-item rounded">
      <div className="m-1 p-0 flex items-center">
        <h2 className="m-0 p-0">
          <div
            className={'flex justify-center items-center w-[34px] h-[34px] text-primary rounded p-2'}>

            <input className={'flex justify-center items-center w-[34px] h-[34px] text-primary rounded p-2'}
                   name={'isCompleted'}
                   type={"checkbox"}
                   checked={data.isCompleted}
                   onChange={(e) => {
                     onChange(e, index)
                   }}
            />
          </div>
        </h2>
      </div>
      <div className="flex px-1 m-1 items-center">
        <input name={'title'}
               type="text"
               className={`form-control form-control-lg border-0 edit-todo-input ${data.isEdit ? 'bg-boneWhite' : 'bg-transparent'}  rounded px-3`}
               readOnly={!data.isEdit}
               value={data.title}
               onChange={(e) => {
                 onChange(e, index)
               }}
        />
      </div>
      <div className="col-auto m-1 p-0 px-3 d-none">
      </div>
      <div className="col-auto m-1 p-0">
        <div className="flex items-center justify-end">
          <h5 className="m-0 p-0 px-2"
              onClick={() => {
                handleEdit(index)
              }}
          >
            <div
              className={'flex justify-center items-center w-[34px] h-[34px] bg-transparent text-primary rounded p-2 cursor-pointer'}>
              <FontAwesomeIcon
                icon={faEdit}
                size={'lg'}
              />
            </div>
          </h5>
          <h5 className="m-0 p-0 px-2">
            <div
              className={'flex justify-center items-center w-[34px] h-[34px] bg-transparent text-danger rounded p-2 cursor-pointer'}>
              <FontAwesomeIcon
                icon={faTrash}
                size={'lg'}
              />
            </div>
          </h5>
        </div>
        <div className="row todo-created-info">
          <div className="col-auto d-flex align-items-center pr-2">
            <i className="fa fa-info-circle my-2 px-2 text-black-50 btn" data-toggle="tooltip"
               data-placement="bottom" title="" data-original-title="Created date"></i>
            <label className="date-label my-2 text-black-50">{`${formattedData}`}</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListItems