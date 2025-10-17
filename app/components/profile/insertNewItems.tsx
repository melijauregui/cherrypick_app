import React, { useState, useCallback } from "react";
import { Keyboard } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { ZodError } from "zod";
import { LOCAL_IP } from "@/config/api";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import safeFetch from "@/app/utils/safe-fetch";
import { MinimumPropertiesItemSchema } from "@/schemas/catalog/catalog-schema";

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
