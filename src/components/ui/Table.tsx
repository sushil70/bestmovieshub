"use client";
import { redirect, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Button from "./button";
import manageAccess from "@/app/actions/AccessManage";
import { Modal } from "./Model";
import AddForm from "@/app/admin/AddForm";

const UserTable: React.FC<TableProps> = ({ data }) => {
  const idSearchParams: string | null = useSearchParams().get("id");

  const [checkingAccess, setCheckingAccess] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      manageAccess(idSearchParams);
    } else {
      redirect("/");
    }
    setCheckingAccess(false);
  }, [idSearchParams]);

  if (checkingAccess) {
    return <div></div>;
  }

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container mx-auto p-6">
          <div className="flex flex-col">
            <Button
              variant="primary"
              className="mb-8 w-fit flex "
              onClick={() => setIsOpen(true)}
            >
              Add Movie
            </Button>
          </div>
          <h1 className="text-2xl font-bold mb-4">Movies Table</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                  <th className="py-2 px-4 border-b text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{item.id}</td>
                    <td className="py-2 px-4 border-b">{item.name}</td>
                    <td className="py-2 px-4 border-b">{item.email}</td>
                    <td className="py-2 px-4 border-b">{item.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Example Modal"
        >
          <AddForm />
        </Modal>
      </Suspense>
    </>
  );
};

export default UserTable;
