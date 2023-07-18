import { FormBuilder } from "@daohaus/form-builder";
import { MolochFields } from "@daohaus/moloch-v3-fields";

import { APP_FORM } from "../legos/forms";
import { TARGETS } from "../targetDao";
import { AppFieldLookup } from "../legos/fieldConfig";

export const FormTest = () => {
  return (
    <FormBuilder
      form={APP_FORM.SIGNAL}
      targetNetwork={TARGETS.CHAIN_ID}
      customFields={{ ...MolochFields, ...AppFieldLookup }}
    />
  );
};
