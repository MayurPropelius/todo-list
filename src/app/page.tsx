"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListItems from "@/components/ListItem";
import { TodoListType } from "@/types/common.types";

const dummyList = [
  {
    isEdit: false,
    title: "Buy groceries for next week",
    isCompleted: true,
    createdDate: new Date(),
    dueDate: new Date("25-05-2024"),
  },
  {
    isEdit: false,
    title: "Renew car insurance",
    isCompleted: false,
    createdDate: new Date(),
    dueDate: new Date("25-05-2024"),
  },
  {
    isEdit: false,
    title: "Sign up for online course",
    isCompleted: false,
    createdDate: new Date(),
    dueDate: new Date("25-05-2024"),
  },
];

export default function Home() {
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>(dummyList);
  const [task, setTask] = useState<string | null>(null);

  const handleChange = (e: any) => {
    setIsOpen(!isOpen);
    setDueDate(e);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleEdit = (index: number) => {
    const prevState = todoLists[index]["isEdit"];
    const temp: any = todoLists.map((item) => {
      const tItem = item;
      tItem.isEdit = false;
      return tItem;
    });

    temp[index]["isEdit"] = !prevState;
    setTodoLists([...temp]);
  };

  const handleTaskListUpdate = (e: any, index: number) => {
    const temp: any = [...todoLists];
    if (e.target.type === "checkbox") {
      temp[index][e.target.name] = e.target.checked;
    } else {
      temp[index][e.target.name] = e.target.value;
    }
    setTodoLists([...temp]);
  };

  const addTaskList = () => {
    setTodoLists((prevState) => {
      return [
        ...prevState,
        {
          isEdit: false,
          title: task || "",
          isCompleted: false,
          createdDate: new Date(),
          dueDate: dueDate,
        },
      ];
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container card m-5 p-2 rounded mx-auto shadow">
        {/*App title section*/}
        <div className="row m-1 p-4">
          <div className="col">
            <div className="flex justify-center items-center gap-5 w-auto p-1 text-primary text-center mx-auto display-inline-block">
              <div
                className={
                  "flex justify-center items-center w-[34px] h-[34px] bg-primary text-white rounded p-2"
                }
              >
                <FontAwesomeIcon icon={faCheck} size={"lg"} />
              </div>
              <h1 className={"text-[34px]"}>My Todo-s</h1>
            </div>
          </div>
        </div>

        {/*Create todo section*/}
        <div className="m-1 p-3">
          <div className="mx-auto">
            <div className="flex w-[95%] m-auto bg-white rounded shadow-sm p-2 add-todo-wrapper items-center justify-between">
              <div className="w-full">
                <input
                  className="w-full form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                  type="text"
                  placeholder="Add new .."
                  onChange={(e) => setTask(e.target.value)}
                />
              </div>
              <div className={"flex w-fit "}>
                <div className="m-0 px-2 flex items-center">
                  {/*<label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label ">Due date not set</label>*/}
                  <div
                    className={
                      "flex justify-center items-center bg-primary text-white relative w-[34px] h-[34px] rounded p-2"
                    }
                    onClick={handleClick}
                  >
                    <FontAwesomeIcon
                      icon={faCalendar}
                      size={"lg"}
                      color={"secondary"}
                    />
                    {isOpen && (
                      <div
                        className={
                          "mt-[30px] absolute top-2 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        }
                      >
                        <DatePicker
                          selected={dueDate}
                          onChange={handleChange}
                          inline
                          dropdownMode="select"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-auto px-0 mx-0 mr-2">
                  <button
                    type="button"
                    className={
                      "inline-block text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-primary text-white hover:bg-blue-600"
                    }
                    onClick={(e) => {
                      addTaskList();
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className={"h-[40px]"}>
              {dueDate && (
                <div className={"mr-8 p-2 text-secondary text-end"}>
                  Due date: {dueDate.toDateString()}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="my-5 p-0 mx-4 border border-b-black-30" />

        {/*View options section*/}
        <div className="flex gap-4 m-1 p-3 px-5 justify-end">
          <div className="flex items-center">
            <label className="text-secondary my-2 pr-2 view-opt-label">
              Filter
            </label>
            <select className="text-secondary py-2 px-4 border-none outline-none rounded my-2">
              <option value="all" selected>
                All
              </option>
              <option value="completed">Completed</option>
              <option value="active">Active</option>
              <option value="has-due-date">Has due date</option>
            </select>
          </div>
          <div className="flex items-center">
            <label className="text-secondary my-2 pr-2 view-opt-label">
              Sort
            </label>
            <select className="text-secondary py-2 px-4 border-none outline-none rounded my-2">
              <option value="added-date-asc" selected>
                Added date
              </option>
              <option value="due-date-desc">Due date</option>
            </select>
          </div>
        </div>

        {/*Todo list section*/}
        <div className="flex flex-col mx-1 px-5 pb-3 w-[80%]">
          <div className="flex flex-col mx-auto">
            {todoLists.map((list, index) => {
              return (
                <ListItems
                  key={`task ${index}`}
                  index={index}
                  data={list}
                  onChange={handleTaskListUpdate}
                  handleEdit={handleEdit}
                />
              );
            })}

            {/*Todo Item 1*/}
            {/*<div className="flex px-3 items-center todo-item rounded">*/}
            {/*  <div className="m-1 p-0 flex items-center">*/}
            {/*    <h2 className="m-0 p-0">*/}
            {/*      <div*/}
            {/*        className={'flex justify-center items-center w-[34px] h-[34px] text-primary rounded p-2'}>*/}
            {/*        <FontAwesomeIcon*/}
            {/*          icon={faSquare}*/}
            {/*          size={'lg'}*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*      <div*/}
            {/*        className={'flex justify-center items-center w-[34px] h-[34px] text-primary rounded p-2'}>*/}
            {/*        <FontAwesomeIcon*/}
            {/*          icon={faCheckSquare}*/}
            {/*          size={'lg'}*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*      /!*<i className="fa fa-square-o text-primary btn m-0 p-0 d-none" data-toggle="tooltip"*!/*/}
            {/*      /!*   data-placement="bottom" title="Mark as complete"></i>*!/*/}
            {/*      /!*<i className="fa fa-check-square-o text-primary btn m-0 p-0" data-toggle="tooltip"*!/*/}
            {/*      /!*   data-placement="bottom" title="Mark as todo"></i>*!/*/}
            {/*    </h2>*/}
            {/*  </div>*/}
            {/*  <div className="flex px-1 m-1 items-center">*/}
            {/*    <input type="text"*/}
            {/*           className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"*/}
            {/*           readOnly value="Buy groceries for next week" title="Buy groceries for next week"/>*/}
            {/*    <input type="text" className="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none"*/}
            {/*           value="Buy groceries for next week"/>*/}
            {/*  </div>*/}
            {/*  <div className="col-auto m-1 p-0 px-3 d-none">*/}
            {/*  </div>*/}
            {/*  <div className="col-auto m-1 p-0 todo-actions">*/}
            {/*    <div className="row d-flex align-items-center justify-content-end">*/}
            {/*      <h5 className="m-0 p-0 px-2">*/}
            {/*        <i className="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip" data-placement="bottom"*/}
            {/*           title="Edit todo"></i>*/}
            {/*      </h5>*/}
            {/*      <h5 className="m-0 p-0 px-2">*/}
            {/*        <i className="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip" data-placement="bottom"*/}
            {/*           title="Delete todo"></i>*/}
            {/*      </h5>*/}
            {/*    </div>*/}
            {/*    <div className="row todo-created-info">*/}
            {/*      <div className="col-auto d-flex align-items-center pr-2">*/}
            {/*        <i className="fa fa-info-circle my-2 px-2 text-black-50 btn" data-toggle="tooltip"*/}
            {/*           data-placement="bottom" title="" data-original-title="Created date"></i>*/}
            {/*        <label className="date-label my-2 text-black-50">28th Jun 2020</label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*Todo Item 2*/}
            {/*<div className="row px-3 align-items-center todo-item rounded">*/}
            {/*  <div className="col-auto m-1 p-0 d-flex align-items-center">*/}
            {/*    <h2 className="m-0 p-0">*/}
            {/*      <i className="fa fa-square-o text-primary btn m-0 p-0" data-toggle="tooltip" data-placement="bottom"*/}
            {/*         title="Mark as complete"></i>*/}
            {/*      <i className="fa fa-check-square-o text-primary btn m-0 p-0 d-none" data-toggle="tooltip"*/}
            {/*         data-placement="bottom" title="Mark as todo"></i>*/}
            {/*    </h2>*/}
            {/*  </div>*/}
            {/*  <div className="col px-1 m-1 d-flex align-items-center">*/}
            {/*    <input type="text"*/}
            {/*           className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3"*/}
            {/*           readOnly value="Renew car insurance" title="Renew car insurance"/>*/}
            {/*    <input type="text" className="form-control form-control-lg border-0 edit-todo-input rounded px-3 d-none"*/}
            {/*           value="Renew car insurance"/>*/}
            {/*  </div>*/}
            {/*  <div className="col-auto m-1 p-0 px-3">*/}
            {/*    <div className="row">*/}
            {/*      <div className="col-auto d-flex align-items-center rounded bg-white border border-warning">*/}
            {/*        <i className="fa fa-hourglass-2 my-2 px-2 text-warning btn" data-toggle="tooltip"*/}
            {/*           data-placement="bottom" title="" data-original-title="Due on date"></i>*/}
            {/*        <h6 className="text my-2 pr-2">28th Jun 2020</h6>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="col-auto m-1 p-0 todo-actions">*/}
            {/*    <div className="row d-flex align-items-center justify-content-end">*/}
            {/*      <h5 className="m-0 p-0 px-2">*/}
            {/*        <i className="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip" data-placement="bottom"*/}
            {/*           title="Edit todo"></i>*/}
            {/*      </h5>*/}
            {/*      <h5 className="m-0 p-0 px-2">*/}
            {/*        <i className="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip" data-placement="bottom"*/}
            {/*           title="Delete todo"></i>*/}
            {/*      </h5>*/}
            {/*    </div>*/}
            {/*    <div className="row todo-created-info">*/}
            {/*      <div className="col-auto d-flex align-items-center pr-2">*/}
            {/*        <i className="fa fa-info-circle my-2 px-2 text-black-50 btn" data-toggle="tooltip"*/}
            {/*           data-placement="bottom" title="" data-original-title="Created date"></i>*/}
            {/*        <label className="date-label my-2 text-black-50">28th Jun 2020</label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*Todo Item 3*/}
            {/*<div className="row px-3 align-items-center todo-item editing rounded">*/}
            {/*  <div className="col-auto m-1 p-0 d-flex align-items-center">*/}
            {/*    <h2 className="m-0 p-0">*/}
            {/*      <i className="fa fa-square-o text-primary btn m-0 p-0" data-toggle="tooltip" data-placement="bottom"*/}
            {/*         title="Mark as complete"></i>*/}
            {/*      <i className="fa fa-check-square-o text-primary btn m-0 p-0 d-none" data-toggle="tooltip"*/}
            {/*         data-placement="bottom" title="Mark as todo"></i>*/}
            {/*    </h2>*/}
            {/*  </div>*/}
            {/*  <div className="col px-1 m-1 d-flex align-items-center">*/}
            {/*    <input type="text"*/}
            {/*           className="form-control form-control-lg border-0 edit-todo-input bg-transparent rounded px-3 d-none"*/}
            {/*           readOnly value="Sign up for online course" title="Sign up for online course"/>*/}
            {/*    <input type="text" className="form-control form-control-lg border-0 edit-todo-input rounded px-3"*/}
            {/*           value="Sign up for online course"/>*/}
            {/*  </div>*/}
            {/*  <div className="col-auto m-1 p-0 px-3 d-none">*/}
            {/*  </div>*/}
            {/*  <div className="col-auto m-1 p-0 todo-actions">*/}
            {/*    <div className="row d-flex align-items-center justify-content-end">*/}
            {/*      <h5 className="m-0 p-0 px-2 edit-icon">*/}
            {/*        <i className="fa fa-pencil text-info btn m-0 p-0" data-toggle="tooltip" data-placement="bottom"*/}
            {/*           title="Edit todo"></i>*/}
            {/*      </h5>*/}
            {/*      <h5 className="m-0 p-0 px-2">*/}
            {/*        <i className="fa fa-trash-o text-danger btn m-0 p-0" data-toggle="tooltip" data-placement="bottom"*/}
            {/*           title="Delete todo"></i>*/}
            {/*      </h5>*/}
            {/*    </div>*/}
            {/*    <div className="row todo-created-info">*/}
            {/*      <div className="col-auto d-flex align-items-center pr-2">*/}
            {/*        <i className="fa fa-info-circle my-2 px-2 text-black-50 btn" data-toggle="tooltip"*/}
            {/*           data-placement="bottom" title="" data-original-title="Created date"></i>*/}
            {/*        <label className="date-label my-2 text-black-50">28th Jun 2020</label>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </main>
  );
}
