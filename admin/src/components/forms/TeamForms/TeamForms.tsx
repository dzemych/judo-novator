import React, {FC, useContext, useEffect, useState} from "react"
import {ItemFormProps} from "../../../types/item"
import useFormsState from "../../../hooks/useFormsState"
import {TeamState} from "../../../types/collection"
import ActionBtns from "../ActionBtns"
import {ITextInput} from "../../../types/textInput"
import TextInputs from "../TextInputs"
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material"
import ImgInput from "../../ImgInput/ImgInput"
import GridInputContainer from "../../UI/GridInputContainer"
import DatePicker from "../../UI/DatePicker"
import {Dayjs} from "dayjs"
import {MuiTelInput} from "mui-tel-input"
import PopUpError from "../../PopUp/PopUpError"
import slugify from "slugify"
import useHttp from "src/hooks/useHttp"
import FormsLayout from "../FormsLayout"
import RecordContext from "../../context/recordContext";


const initialState: TeamState = {
   position: "",
   name: "",
   surname: "",
   description: '',
   mainPhoto: null,
   mediaLinks: {
      instagram: '',
      facebook: '',
      viber: '',
      telegram: ''
   },
   positionType: 'worker',
   birth: null,
   email: '',
   tel: '+380'
}

const TeamForms: FC<ItemFormProps> = (
   {
      item = initialState,
      submitHandler,
      deleteHandler
   }) => {

   const { collectionType, recordType } = useContext(RecordContext)
   const {requestJson} = useHttp()

   const {
      formsState,
      formErrors,
      handleFormsChange,
      isValid,
      getFormData,
      formsLoading,
   } = useFormsState(initialState, item)
   // Without changing global is valid state react doesn't update component on formErrors change
   const [allValid, setAllValid] = useState(true)
   const [uniqueError, setUniqueError] = useState(false)

   const handleDateChange = (newValue: Dayjs | null) => {
      handleFormsChange('birth')(undefined, newValue)
   }

   const handleTelChange = (val: string) => {
      handleFormsChange('tel')(undefined, val)
   }

   const uniqueCheck = async () => {
      if (recordType === 'create' && collectionType) {
         // @ts-ignore
         const slug = slugify(`${formsState.surname}-${formsState.name}`)

         const res = await requestJson(
            `/api/${collectionType}?slug=${slug}`
         )

         if (res.results > 0) {
            setUniqueError(true)
            return false
         }
      }

      return true
   }

   const onSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault()

      const valid = await isValid()
      setAllValid(valid)

      const isUnique = await uniqueCheck()

      if (valid && isUnique) {
         await submitHandler(getFormData(item))
      }
   }

   const inputs: ITextInput[] = [
      {
         key: 'position',
         label: '???????????? ????????????*',
         value: formsState.position,
         changeHandler: handleFormsChange('position'),
         error: formErrors.position,
         helperText: '?????????????? 2 ??????????????'
      },
      {
         key: 'name',
         label: "????'??*",
         value: formsState.name,
         changeHandler: handleFormsChange('name'),
         error: formErrors.name,
         helperText: '?????????????? 2 ??????????????'
      },
      {
         key: 'surname',
         label: '??????????????*',
         value: formsState.surname,
         changeHandler: handleFormsChange('surname'),
         error: formErrors.surname,
         helperText: '?????????????? 2 ??????????????'
      },
      {
         key: 'description',
         label: '????????',
         value: formsState.description,
         changeHandler: handleFormsChange('description'),
         error: formErrors.description,
         helperText: '',
         rows: 2
      }
   ]

   const mediaInputs: ITextInput[] = [
      {
         key: 'mediaLinks.instagram',
         label: '???????????? ???? ??????????????????',
         value: formsState.mediaLinks.instagram,
         changeHandler: handleFormsChange('mediaLinks.instagram'),
         error: formErrors.mediaLinks.instagram,
         helperText: ''
      },
      {
         key: 'mediaLinks.telegram',
         label: '???????????? ???? ????????????????',
         value: formsState.mediaLinks.telegram,
         changeHandler: handleFormsChange('mediaLinks.telegram'),
         error: formErrors.mediaLinks.telegram,
         helperText: ''
      },
      {
         key: 'mediaLinks.viber',
         label: '???????????? ???? ????????????',
         value: formsState.mediaLinks.viber,
         changeHandler: handleFormsChange('mediaLinks.viber'),
         error: formErrors.mediaLinks.viber,
         helperText: ''
      },
      {
         key: 'mediaLinks.facebook',
         label: '???????????? ???? ??????????????',
         value: formsState.mediaLinks.facebook,
         changeHandler: handleFormsChange('mediaLinks.facebook'),
         error: formErrors.mediaLinks.facebook,
         helperText: ''
      },
   ]

   useEffect(() => {
      if (formErrors.tel || formErrors.email) {
         document.getElementById('tel-input')?.scrollIntoView()
      } else {
         document.getElementById('main-root')?.scrollTo(0, 120)
      }
   }, [formErrors, allValid, uniqueError])

   return (
      <FormsLayout>
         <>
            <PopUpError
               isOpen={uniqueError}
               onClose={() => {setUniqueError(false)}}
               text={"???????????? ?? ?????????? ?????????????????? ???? ????'???? ?????? ??????????"}
            />
            <Grid container>
               <GridInputContainer key='img-input'>
                  <ImgInput
                     label='?????????????? ???????? ????????????*'
                     changeHandler={val => { handleFormsChange('mainPhoto')(undefined, val) }}
                     deleteHandler={() => { handleFormsChange('mainPhoto')(undefined, null) }}
                     error={formErrors.mainPhoto}
                     state={formsState.mainPhoto}
                  />
               </GridInputContainer>

               <GridInputContainer>
                  <FormControl variant="filled" sx={{ mt: .5, mb: .5, minWidth: 120 }}>
                     <InputLabel id="demo-simple-select-filled-label">??????</InputLabel>
                     <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={formsState.positionType}
                        //@ts-ignore
                        onChange={handleFormsChange('positionType')}
                     >
                        <MenuItem value='worker'>??????????????????</MenuItem>
                        <MenuItem value='sportsman'>??????????????????</MenuItem>
                     </Select>
                  </FormControl>
               </GridInputContainer>

               <TextInputs inputs={inputs}/>

               <GridInputContainer key='date-picker'>
                  <DatePicker
                     title={'??????'}
                     value={formsState.birth ? formsState.birth : null}
                     handleChange={handleDateChange}
                  />
               </GridInputContainer>

               <GridInputContainer>
                  <TextInputs inputs={[{
                     label: '??????????',
                     key: 'email',
                     helperText: '',
                     error: formErrors.email,
                     value: formsState.email,
                     changeHandler: handleFormsChange('email')
                  }]}/>
               </GridInputContainer>

               <GridInputContainer>
                  <div style={{
                     border: formErrors.tel ? '1px solid #d32f2f' : '',
                     width: 'fit-content',
                     borderRadius: '5px'
                  }}>
                     <MuiTelInput
                        id={'tel-input'}
                        value={formsState.tel}
                        onChange={handleTelChange}
                        onlyCountries={['UA', 'PL']}
                     />
                  </div>
               </GridInputContainer>

               <GridInputContainer>
                  <TextInputs inputs={mediaInputs}/>
               </GridInputContainer>
            </Grid>

            <ActionBtns
               disabled={formsLoading}
               onSubmit={onSubmit}
               deleteHandler={deleteHandler}
            />
         </>
      </FormsLayout>
   )
}

export default TeamForms