import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEditPost, useFetchSinglePost } from "../../hooks/queries/posts";
import { getKeyAndValuesFromData } from "../../utils/getKeyAndValuesFromData";
import { capitalize } from "../../utils/capitalize";
import styles from "./editItem.module.css";
import { Path } from "../../navigations/routes";
import { resolveAxiosError } from "../../utils/resolveAxiosError";

const EditItem = () => {
  const [form, setForm] = useState<Record<string, string>>({});

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useFetchSinglePost({ id: id || "" });
  const { mutateAsync, isPending } = useEditPost();

  useEffect(() => {
    if (data && Object.keys(form).length <= 1) {
      const obj: Record<string, string> = {};
      const mappedData = getKeyAndValuesFromData(data?.data);

      mappedData.forEach((item) => {
        obj[item.key] = item.value;
      });

      setForm((prev) => ({
        ...prev,
        ...obj,
        name: data.name,
      }));
    }
  }, [data, form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const copied = { ...form };
      delete copied.name;
      const res = await mutateAsync({
        id: id || "",
        data: { name: form.name, data: copied },
      });

      if (res) {
        alert(`${data?.name} deleted successfully`);
        navigate(Path.Home);
      }
    } catch (error: any) {
      const errMessage = resolveAxiosError(error).message;
      alert(errMessage);
    }
  };

  const formKeys = Object.keys(form);

  return (
    <div>
      <h1 className="page-header">Edit page</h1>
      {isLoading && <div>Loading...</div>}
      {!isLoading && data && formKeys.length && (
        <form onSubmit={handleSubmit} className={styles["form"]}>
          <Link className={styles["back-link"]} to={Path.Home}>
            {"<"} Back to Home
          </Link>
          <div>
            {formKeys.map((key) => (
              <div key={key} className={styles["form-input-container"]}>
                <label>{capitalize(key)}</label>
                <input
                  type="text"
                  name={key}
                  onChange={handleChange}
                  value={form[key]}
                />
              </div>
            ))}
            <div>
              <button disabled={isPending} type="submit">
                {isPending ? "Loading..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditItem;
