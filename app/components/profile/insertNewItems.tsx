// import React, { useState, useCallback } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableWithoutFeedback,
//   Keyboard,
//   ScrollView,
// } from "react-native";
// import BottomSheet from "@gorhom/bottom-sheet";
// import { ZodError } from "zod";
// import { LOCAL_IP } from "@/config/api";
// import Toast from "react-native-toast-message";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import safeFetch from "@/app/utils/safe-fetch";
// import { MinimumPropertiesItemSchema } from "@/schemas/catalog/catalog-schema";
// import InputBoxWithName from "./inputBox";

// import { BottomSheetStandar } from "../bottom-sheet/bottomSheet";
// import ImageComplete from "../ImageComplete";
// import ImagePickerButton from "../imagePicker";
// import { imageDefault } from "@/lib/constants";

// export const InsertNewItemsModal: React.FC<{
//   bottomSheetRef: React.RefObject<BottomSheet>;
//   onSubmit: (data: FormDataItem) => void;
//   brandEmail: string;
//   formDataLastValue: FormDataItem;
// }> = ({ bottomSheetRef, onSubmit, brandEmail, formDataLastValue }) => {
//   const [formData, setFormData] = useState<FormDataItem>({
//     ...formDataLastValue,
//   });
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const mutation = useInsertItem(
//     setFormData,
//     setIsSubmitting,
//     setErrors,
//     onSubmit,
//     bottomSheetRef
//   );
//   return (
//     <ItemsBottomSheetDetails
//       bottomSheetRef={bottomSheetRef}
//       onSubmit={onSubmit}
//       formDataLastValue={formDataLastValue}
//       submitMutate={formData => mutation.mutate({ formData })}
//       setFormData={setFormData}
//       formData={formData}
//       setIsSubmitting={setIsSubmitting}
//       setErrors={setErrors}
//       errors={errors}
//       isSubmitting={isSubmitting}
//       section={"Add New Item"}
//     />
//   );
// };

// const ItemsBottomSheetDetails: React.FC<{
//   bottomSheetRef: React.RefObject<BottomSheet>;
//   onSubmit: (data: FormDataItem) => void;
//   formDataLastValue: FormDataItem;
//   submitMutate: (formData: FormDataItem) => void;
//   setFormData: React.Dispatch<React.SetStateAction<FormDataItem>>;
//   formData: FormDataItem;
//   setIsSubmitting: (isSubmitting: boolean) => void;
//   setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
//   errors: FormErrors;
//   isSubmitting: boolean;
//   section: string;
// }> = ({
//   bottomSheetRef,
//   onSubmit,
//   formDataLastValue,
//   submitMutate,
//   setFormData,
//   setIsSubmitting,
//   setErrors,
//   formData,
//   errors,
//   isSubmitting,
//   section,
// }) => {
//   const handleFieldChange = (field: keyof FormDataItem, value: string) => {
//     // Validar que el valor no sea undefined o null para evitar NaN
//     const safeValue = value || "";

//     // Solo para el campo price, convertir comas a puntos
//     if (field === "price") {
//       const priceValue = safeValue.replace(",", ".");
//       setFormData((prev: FormDataItem) => ({ ...prev, [field]: priceValue }));
//     } else {
//       setFormData((prev: FormDataItem) => ({ ...prev, [field]: safeValue }));
//     }

//     if (errors[field as keyof FormErrors]) {
//       setErrors((prev: FormErrors) => ({ ...prev, [field]: undefined }));
//     }
//   };

//   const isFormValid = Boolean(
//     formData.name &&
//       formData.price &&
//       formData.url &&
//       formData.image.url &&
//       formData.description &&
//       formData.price &&
//       (formData.name !== formDataLastValue.name ||
//         formData.description !== formDataLastValue.description ||
//         formData.price !== formDataLastValue.price ||
//         formData.url !== formDataLastValue.url ||
//         formData.image.url !== formDataLastValue.image.url)
//   );

//   return (
//     <BottomSheetStandar
//       bottomSheetRef={bottomSheetRef}
//       onSave={() => submitMutate(formData)}
//       onCancel={() => {
//         bottomSheetRef.current?.close();
//         setFormData({
//           ...formDataLastValue,
//         });
//         setErrors({});
//         Keyboard.dismiss();
//       }}
//       section={section}
//       onLoading={isSubmitting}
//     >
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         className="flex-1 "
//       >
//         <View className="flex-1 px-6 pt-1">
//           <ScrollView
//             showsVerticalScrollIndicator={true}
//             keyboardShouldPersistTaps="handled"
//             contentContainerStyle={{ flexGrow: 1 }}
//           >
//             <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//               <View style={{ minHeight: "100%" }}>
//                 <View className="flex flex-col gap-6">
//                   <View>
//                     <ImageComplete
//                       imageUrl={formData.image.url ?? imageDefault}
//                       imageUrlUpdatedAt={undefined}
//                     />
//                     <View className="flex justify-center items-center">
//                       <ImagePickerButton
//                         setImage={image =>
//                           setFormData({
//                             ...formData,
//                             image: {
//                               url: image,
//                               updatedAt: new Date().toISOString(),
//                             },
//                           })
//                         }
//                       >
//                         <View className=" bg-beige rounded-2xl px-4 py-2 mt-3 items-center justify-center">
//                           <Text className="text-black text-base font-pmedium">
//                             Edit image
//                           </Text>
//                         </View>
//                       </ImagePickerButton>
//                     </View>
//                   </View>
//                   <InputBoxWithName
//                     name="Product Name"
//                     value={formData.name}
//                     setValue={text => handleFieldChange("name", text)}
//                     error={errors.name}
//                     lastValue={formData.name}
//                     isScrollable={false}
//                     keyboardType="default"
//                     autoCapitalize="words"
//                     placeholder="Escribe el nombre del nuevo item"
//                   />

//                   <InputBoxWithName
//                     name="Description"
//                     value={formData.description}
//                     error={errors.description}
//                     setValue={text => handleFieldChange("description", text)}
//                     lastValue={formData.description}
//                     isScrollable={true}
//                     placeholder="Escribe una descripción del nuevo item"
//                     height={120}
//                   />

//                   <InputBoxWithName
//                     name="Product URL"
//                     value={formData.url}
//                     setValue={text => handleFieldChange("url", text)}
//                     error={errors.url}
//                     lastValue={formData.url}
//                     keyboardType="url"
//                     autoCapitalize="none"
//                     placeholder="Escribe la url del nuevo item"
//                     isScrollable={false}
//                   />

//                   <InputBoxWithName
//                     name="Price"
//                     value={formData.price}
//                     setValue={text => handleFieldChange("price", text)}
//                     error={errors.price}
//                     lastValue={formData.price.toString()}
//                     isScrollable={false}
//                     placeholder="Escribe el precio del nuevo item"
//                     keyboardType="decimal-pad"
//                     autoCapitalize="none"
//                   />
//                 </View>
//               </View>
//             </TouchableWithoutFeedback>
//           </ScrollView>
//         </View>
//       </KeyboardAvoidingView>
//     </BottomSheetStandar>
//   );
// };

// export default ItemsBottomSheetDetails;

// function useInsertItem(
//   setFormData: React.Dispatch<React.SetStateAction<FormDataItem>>,
//   setIsSubmitting: (isSubmitting: boolean) => void,
//   setErrors: (errors: FormErrors) => void,
//   onSubmit: (data: FormDataItem) => void,
//   bottomSheetRef: React.RefObject<BottomSheet>
// ) {
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: async (data: { formData: FormDataItem }) => {
//       const result = MinimumPropertiesItemSchema.safeParse({
//         ...data.formData,
//       });
//       if (!result.success) {
//         throw new ZodError(result.error.errors);
//       }
//       setErrors({});

//       setIsSubmitting(true);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       bottomSheetRef.current?.close();

//       const item = {
//         name: result.data.name,
//         description: result.data.description,
//         price: result.data.price,
//         imageUrl: "", // TODO: add imageUrl
//         url: result.data.url,
//       };

//       // Cerrar el modal y limpiar el formulario inmediatamente
//       setFormData({
//         name: "",
//         description: "",
//         price: "",
//         url: "",
//         image: { url: "", updatedAt: "" },
//       });

//       const response = await safeFetch({
//         url: `http://${LOCAL_IP}:3000/brand/insert-items`,
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           items: [item],
//         }),
//       });
//       if (response.data.error) {
//         throw new Error(response.data.details + "\n" + response.data.info);
//       }
//       return response.data;
//     },
//     onSuccess: (data, variables) => {
//       onSubmit(variables.formData);
//       Toast.show({
//         type: "success",
//         text1: `The item ${variables.formData.name} has been successfully added to the catalog.`,
//         visibilityTime: 2000,
//       });
//     },
//     onError: (responseError, data) => {
//       const newErrors: FormErrors = {};
//       if (responseError instanceof ZodError) {
//         responseError.errors.forEach(error => {
//           const field = error.path[0] as keyof FormDataItemUpload;
//           console.log("field", field);
//           newErrors[field] = error.message;
//         });
//         setErrors(newErrors);
//         setIsSubmitting(false);
//         return;
//       }
//       if (responseError instanceof Error) {
//         if (responseError.message.includes("[1] mal formados")) {
//           Toast.show({
//             type: "error",
//             text1: `The item ${data.formData.name} is not valid.`,
//             visibilityTime: 6000,
//           });
//         } else {
//           console.log("Error inserting item wwhaat:");
//           Toast.show({
//             type: "error",
//             text1: `Error inserting item ${data.formData.name}: ${responseError.message}`,
//             visibilityTime: 6000,
//           });
//         }
//         setIsSubmitting(false);
//       }
//     },
//     onSettled: () => {
//       setIsSubmitting(false);
//       Keyboard.dismiss();
//     },
//   });

//   return mutation;
// }

// export const ButtonSubmit = ({
//   isSubmitting,
//   isFormValid,
//   handleSubmit,
//   text,
//   loadingText,
// }: {
//   isSubmitting: boolean;
//   isFormValid: boolean;
//   handleSubmit: () => void;
//   text: string;
//   loadingText: string;
// }) => {
//   return (
//     <View className="flex flex-row justify-end my-2 py-3">
//       <TouchableOpacity
//         disabled={!isFormValid || isSubmitting}
//         onPress={handleSubmit}
//         className={`
//         flex flex-row items-center px-6 py-3 rounded-3xl
//         ${!isFormValid || isSubmitting ? "opacity-50" : ""}
//       `}
//         style={{
//           backgroundColor: "rgba(107, 114, 128, 0.5)",
//         }}
//       >
//         <Text className="text-[16px] font-psemibold text-white">
//           {isSubmitting ? loadingText : text}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
