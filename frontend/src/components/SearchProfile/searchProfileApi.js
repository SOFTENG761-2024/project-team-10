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
                // Group individuals by institution and then by faculty
                const groups = response.data.reduce((acc, item) => {
                    const institutionId = item.institution?.id;
                    const institutionName = item.institution?.name;
                    const facultyId = item.faculty_id;
                    const facultyName = item.department;

                    if (institutionId && institutionName) {
                        if (!acc[institutionId]) {
                            acc[institutionId] = {
                                institution: { id: institutionId, name: institutionName },
                                faculties: {},
                                totalMembers: 0,
                            };
                        }

                        if (facultyId && facultyName) {
                            if (!acc[institutionId].faculties[facultyId]) {
                                acc[institutionId].faculties[facultyId] = {
                                    faculty: { id: facultyId, name: facultyName },
                                    members: [],
                                };
                            }

                            acc[institutionId].faculties[facultyId].members.push({
                                id: item.id,
                                name: item.first_name + " " + item.last_name,
                            });
                        }
                        acc[institutionId].totalMembers += 1;
                    }
                    return acc;
                }, {});

                // Convert the groups object to an array
                const institutionGroupsArray = Object.values(groups).map(institution => ({
                    ...institution,
                    faculties: Object.values(institution.faculties),
                }));

                console.log(institutionGroupsArray);
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
