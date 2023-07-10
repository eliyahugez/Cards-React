import Joi from "joi";
import { func, object } from "prop-types";
import { useCallback, useMemo, useState } from "react";

const useForm = (initialForm, schema, handleSubmit) => {
   
    const [formData, setFormData] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const handleReset = useCallback(() => {
        setFormData(initialForm);
        setErrors({});
    }, [initialForm]);

    const validateProperty = useCallback(({ name, value }) => {
        const obj = { [name]: value };
        const generateSchema = Joi.object({ [name]: schema[name] });
        const { error } = generateSchema.validate(obj);
        return error ? error.details[0].message : null;
    }, [schema]);

    const handleChange = useCallback(
        ({ target }) => {//target = <input name="username" value="naor"></input>
            const { name, value } = target;
            const errorMessage = validateProperty(target);
            if (errorMessage)
                setErrors((prev) => ({ ...prev, [name]: errorMessage }));
            else
                setErrors((prev) => {
                    let obj = { ...prev };
                    delete obj[name];
                    return obj;
                });

            setFormData((prev) => ({ ...prev, [name]: value }));
        },
        [validateProperty]
    );
   
    const validateForm = useCallback(() => {
        const schemaForValidate = Joi.object(schema);
        const { error } = schemaForValidate.validate(formData);
        if (error) return error;
        return null;
    }, [schema, formData]);

    const onSubmit = useCallback(() => {
        handleSubmit(formData);
    }, [handleSubmit, formData]);

    const value = useMemo(() => {
        return { formData, errors };
    }, [formData, errors]);

    return {
        value,
        onSubmit,
        handleChange,
        handleReset,
        validateForm,
        setFormData,
    };
}

useForm.propTypes = {
    initialForm: object.isRequired,
    schema: object.isRequired,
    handleSubmit: func.isRequired,
  };
  
  export default useForm;