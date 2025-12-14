import React from "react";
import { useState } from "react";
import FormContact from "../../components/form/FormContact";
import FormAddContactInfo from "../../components/form/FormAddContactInfo";
function Contact({ isLogedIn, setStatus }) {
  const [loading, setLoading] = useState(false);

  return (
    <section>
      <h1 className="font-bold text-red-600 text-3xl mb-4">
        <i className="fas fa-envelope"></i> Liên hệ
      </h1>
      <p className=" text-lg mb-4">
        Nếu bạn quan tâm đến mình hoặc dự án của mình, hãy liên hệ qua các kênh
        dưới đây:
      </p>

      <div className="flex">
        <div className="flex-[7]">
          {/* {!isLogedIn && (
          )} */}
          <div>
            <p className="text-2xl">Form liên hệ</p>
            <FormContact
              loading={loading}
              setLoading={setLoading}
              setStatus={setStatus}
            ></FormContact>
          </div>
        </div>
        {/* Ảnh minh họa */}
        <div className="flex-[3]">
          <img
            src="/contact.png"
            alt="Contact"
            className="w-100% h-100% mx-auto mb-4"
          />
        </div>
      </div>
    </section>
  );
}
export default Contact;
