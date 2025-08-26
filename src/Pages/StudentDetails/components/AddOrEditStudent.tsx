import  { useState } from 'react'
import { CustomFormField } from '../../../uitilities/CustomComponents/Customformfields'
import { useForm } from 'react-hook-form'
import { Button, IconButton, ListItem, ListItemText } from '@mui/material'
import { Add, Delete } from '@mui/icons-material'

function AddOrEditStudent() {
    const {control,getValues,resetField}=useForm()
     const [subjectList, setSubjectList] = useState<{ id: number; name: string }[]>([]);
      const addSubject = () => {
    const subject = getValues("subject");
    if (subject.id) {
      const isSubjectExist = subjectList.find((p) => p.id === subject.id);
      if (isSubjectExist) {
        showSnackbar({
          message: "subject already exists",
          open: true,
          variant: "warning",
          duration: 3000,
        });
        resetField("subject", { defaultValue: null });
        return;
      }
      setSubjectList((prev) => [
        ...prev,
        { id: subject.id, name: subject.name },
      ]);
      resetField("subject", { defaultValue: null });
    } else {
      showSnackbar({
        message: "Please select a subject",
        open: true,
        variant: "warning",
        duration: 3000,
      });
      return;
    }
  };
  const RemoveSubject = (id: number) => {
    setSubjectList((prev) => prev.filter((plan) => plan.id !== id));
  };
  return (
   <>
     <div className='className="p-3 grid grid-cols-4 gap-3'>

        <CustomFormField
        control={control}
        element='input'
        name='name'
        rules={{required:"Name is Required"}}
        fieldProps={{label:"Enter Name"}} />

        <CustomFormField
        control={control}
        element='input'
        name='email'
        rules={{required:"email is Required"}}
        fieldProps={{label:"Enter email"}} />

        <CustomFormField
        control={control}
        element='input'
        name='age'
        rules={{required:"age is Required"}}
        fieldProps={{label:"Enter Age"}} />

        <CustomFormField
        control={control}
        element='input'
        name='class'
        rules={{required:"class is Required"}}
        fieldProps={{label:"Enter class"}} />

     </div>
     <div className="p-3 grid grid-cols-12 gap-3 ">
                 <div className="col-span-3" >
                   <CustomFormField
                     control={control}
                     name="subjects"
                     element="autocomplete"
                     options={["physics","chemistry","English","socialScience"]}
                     fieldProps={{ label: "select subject " }}
                     rules={{ required: false }}
                     autocompleteProps={{
                       isOptionEqualToValue: (option, value) =>
                         option?.id == value?.id,
                       getOptionLabel: (option) => option?.name,
                       filterOptions: option => option
                     }}
         
                   />
                 </div>
                 <div className="col-span-9 flex justify-start items-center">
                   <Button endIcon={<Add />} onClick={addSubject}>
                     Add Plan
                   </Button>
                 </div>
                 <div className="col-span-full">
                   <div className="flex justify-start gap-2 items-center flex-wrap">
                     {subjectList.map((plan) => (
                       <div className=" border-2 rounded">
                         <ListItem
                           key={plan.id}
                           secondaryAction={
                             <IconButton onClick={() => RemoveSubject(plan.id)} color="error" edge="end" aria-label="delete">
                               <Delete />
                             </IconButton>
                           }
                         >
                           <ListItemText primary={plan.name} />
                         </ListItem>
                       </div>
                     ))}
                   </div>
                 </div>
         
          </div>
   </>
  )
}

export default AddOrEditStudent