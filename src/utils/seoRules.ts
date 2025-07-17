export const seoRules = {
    title: {
        maxLength: 60,
        required: true,
        message: "Title should be less than 60 characters and is required."
    },
    description: {
        maxLength: 160,
        required: true,
        message: "Description should be less than 160 characters and is required."
    },
    ogTitle: {
        maxLength: 60,
        required: false,
        message: "Open Graph title should be less than 60 characters."
    },
    ogDescription: {
        maxLength: 110,
        required: false,
        message: "Open Graph description should be less than 110 characters."
    },
    twitterTitle: {
        maxLength: 70,
        required: false,
        message: "Twitter title should be less than 70 characters."
    },
    twitterDescription: {
        maxLength: 200,
        required: false,
        message: "Twitter description should be less than 200 characters."
    }
};

export const validateMetaTags = (metaTags: Record<string, string>): string[] => {
    const errors: string[] = [];

    if (metaTags.title) {
        if (metaTags.title.length > seoRules.title.maxLength) {
            errors.push(seoRules.title.message);
        }
    } else if (seoRules.title.required) {
        errors.push("Title is required.");
    }

    if (metaTags.description) {
        if (metaTags.description.length > seoRules.description.maxLength) {
            errors.push(seoRules.description.message);
        }
    } else if (seoRules.description.required) {
        errors.push("Description is required.");
    }

    // Additional validations for Open Graph and Twitter tags can be added here

    return errors;
};