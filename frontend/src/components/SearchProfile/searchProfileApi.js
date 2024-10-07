import { useAPI } from "@frontend-ui/components/GlobalProviders";
import { useState, useCallback } from 'react';

export const useSearchProfiles = () => {
    const { get } = useAPI();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [institutionGroups, setInstitutionGroups] = useState([]);

    const searchProfiles = useCallback(async (keyword) => {
        if (!keyword.trim()) {
            alert("Please enter a keyword to search.");
            return;
        }

        setLoading(true);
        setError(null);
        setInstitutionGroups([]);

        try {
            const response = await get(
                `${import.meta.env.VITE_BACKEND_API_BASE_URL}/api/search?keyword=${encodeURIComponent(keyword)}`
            );

            if (response.data && response.data.length > 0) {
                // Group individuals by institution
            const groups = response.data.reduce((acc, item) => {
            const institutionName = item.institution?.name;
        if (institutionName) {
            if (!acc[institutionName]) {
                acc[institutionName] = {
                    institution: item.institution,
                    members: [],
            };
        }
        acc[institutionName].members.push(item);
    }
    return acc;
    }, {});

    // Convert the groups object to an array
    const institutionGroupsArray = Object.values(groups);
    setInstitutionGroups(institutionGroupsArray);
    } else {
        setError({ message: "No institutions found" });
    }
    } catch (err) {
        setError({ message: "An error occurred while fetching data." });
    } finally {
        // Add a slight delay to improve UX before updating loading to false
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }
    }, [get]);

    return { institutionGroups, loading, error, searchProfiles };
};
