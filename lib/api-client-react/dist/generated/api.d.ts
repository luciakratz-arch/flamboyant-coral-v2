import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { AccessLog, AccessLogSummary, Announcement, CoralSettings, CreateAccessLogBody, CreateAnnouncementBody, CreateEventBody, CreateMemberBody, CreateSongBody, CreateStudyMaterialBody, Dashboard, Event, EventAttendance, HealthStatus, ListEventsParams, ListMembersParams, ListSongsParams, Member, MemberStats, Song, SongCategoryGroup, StudyMaterial, UpdateAnnouncementBody, UpdateEventBody, UpdateMemberBody, UpdateSetlistBody, UpdateSettingsBody, UpdateSongBody, UpdateStudyMaterialBody, UpsertAttendanceBody } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List all choir members
 */
export declare const getListMembersUrl: (params?: ListMembersParams) => string;
export declare const listMembers: (params?: ListMembersParams, options?: RequestInit) => Promise<Member[]>;
export declare const getListMembersQueryKey: (params?: ListMembersParams) => readonly ["/api/members", ...ListMembersParams[]];
export declare const getListMembersQueryOptions: <TData = Awaited<ReturnType<typeof listMembers>>, TError = ErrorType<unknown>>(params?: ListMembersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMembers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMembers>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMembersQueryResult = NonNullable<Awaited<ReturnType<typeof listMembers>>>;
export type ListMembersQueryError = ErrorType<unknown>;
/**
 * @summary List all choir members
 */
export declare function useListMembers<TData = Awaited<ReturnType<typeof listMembers>>, TError = ErrorType<unknown>>(params?: ListMembersParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMembers>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new choir member
 */
export declare const getCreateMemberUrl: () => string;
export declare const createMember: (createMemberBody: CreateMemberBody, options?: RequestInit) => Promise<Member>;
export declare const getCreateMemberMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMember>>, TError, {
        data: BodyType<CreateMemberBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createMember>>, TError, {
    data: BodyType<CreateMemberBody>;
}, TContext>;
export type CreateMemberMutationResult = NonNullable<Awaited<ReturnType<typeof createMember>>>;
export type CreateMemberMutationBody = BodyType<CreateMemberBody>;
export type CreateMemberMutationError = ErrorType<unknown>;
/**
 * @summary Create a new choir member
 */
export declare const useCreateMember: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createMember>>, TError, {
        data: BodyType<CreateMemberBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createMember>>, TError, {
    data: BodyType<CreateMemberBody>;
}, TContext>;
/**
 * @summary Get member statistics
 */
export declare const getGetMemberStatsUrl: () => string;
export declare const getMemberStats: (options?: RequestInit) => Promise<MemberStats>;
export declare const getGetMemberStatsQueryKey: () => readonly ["/api/members/stats"];
export declare const getGetMemberStatsQueryOptions: <TData = Awaited<ReturnType<typeof getMemberStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMemberStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMemberStats>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMemberStatsQueryResult = NonNullable<Awaited<ReturnType<typeof getMemberStats>>>;
export type GetMemberStatsQueryError = ErrorType<unknown>;
/**
 * @summary Get member statistics
 */
export declare function useGetMemberStats<TData = Awaited<ReturnType<typeof getMemberStats>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMemberStats>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get a member by ID
 */
export declare const getGetMemberUrl: (id: number) => string;
export declare const getMember: (id: number, options?: RequestInit) => Promise<Member>;
export declare const getGetMemberQueryKey: (id: number) => readonly [`/api/members/${number}`];
export declare const getGetMemberQueryOptions: <TData = Awaited<ReturnType<typeof getMember>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMember>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMember>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMemberQueryResult = NonNullable<Awaited<ReturnType<typeof getMember>>>;
export type GetMemberQueryError = ErrorType<void>;
/**
 * @summary Get a member by ID
 */
export declare function useGetMember<TData = Awaited<ReturnType<typeof getMember>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMember>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update a member
 */
export declare const getUpdateMemberUrl: (id: number) => string;
export declare const updateMember: (id: number, updateMemberBody: UpdateMemberBody, options?: RequestInit) => Promise<Member>;
export declare const getUpdateMemberMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMember>>, TError, {
        id: number;
        data: BodyType<UpdateMemberBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateMember>>, TError, {
    id: number;
    data: BodyType<UpdateMemberBody>;
}, TContext>;
export type UpdateMemberMutationResult = NonNullable<Awaited<ReturnType<typeof updateMember>>>;
export type UpdateMemberMutationBody = BodyType<UpdateMemberBody>;
export type UpdateMemberMutationError = ErrorType<void>;
/**
 * @summary Update a member
 */
export declare const useUpdateMember: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateMember>>, TError, {
        id: number;
        data: BodyType<UpdateMemberBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateMember>>, TError, {
    id: number;
    data: BodyType<UpdateMemberBody>;
}, TContext>;
/**
 * @summary Delete a member
 */
export declare const getDeleteMemberUrl: (id: number) => string;
export declare const deleteMember: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteMemberMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMember>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteMember>>, TError, {
    id: number;
}, TContext>;
export type DeleteMemberMutationResult = NonNullable<Awaited<ReturnType<typeof deleteMember>>>;
export type DeleteMemberMutationError = ErrorType<unknown>;
/**
 * @summary Delete a member
 */
export declare const useDeleteMember: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteMember>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteMember>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List all songs
 */
export declare const getListSongsUrl: (params?: ListSongsParams) => string;
export declare const listSongs: (params?: ListSongsParams, options?: RequestInit) => Promise<Song[]>;
export declare const getListSongsQueryKey: (params?: ListSongsParams) => readonly ["/api/songs", ...ListSongsParams[]];
export declare const getListSongsQueryOptions: <TData = Awaited<ReturnType<typeof listSongs>>, TError = ErrorType<unknown>>(params?: ListSongsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listSongs>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listSongs>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListSongsQueryResult = NonNullable<Awaited<ReturnType<typeof listSongs>>>;
export type ListSongsQueryError = ErrorType<unknown>;
/**
 * @summary List all songs
 */
export declare function useListSongs<TData = Awaited<ReturnType<typeof listSongs>>, TError = ErrorType<unknown>>(params?: ListSongsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listSongs>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Add a new song
 */
export declare const getCreateSongUrl: () => string;
export declare const createSong: (createSongBody: CreateSongBody, options?: RequestInit) => Promise<Song>;
export declare const getCreateSongMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createSong>>, TError, {
        data: BodyType<CreateSongBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createSong>>, TError, {
    data: BodyType<CreateSongBody>;
}, TContext>;
export type CreateSongMutationResult = NonNullable<Awaited<ReturnType<typeof createSong>>>;
export type CreateSongMutationBody = BodyType<CreateSongBody>;
export type CreateSongMutationError = ErrorType<unknown>;
/**
 * @summary Add a new song
 */
export declare const useCreateSong: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createSong>>, TError, {
        data: BodyType<CreateSongBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createSong>>, TError, {
    data: BodyType<CreateSongBody>;
}, TContext>;
/**
 * @summary Get a song by ID
 */
export declare const getGetSongUrl: (id: number) => string;
export declare const getSong: (id: number, options?: RequestInit) => Promise<Song>;
export declare const getGetSongQueryKey: (id: number) => readonly [`/api/songs/${number}`];
export declare const getGetSongQueryOptions: <TData = Awaited<ReturnType<typeof getSong>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSong>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSong>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSongQueryResult = NonNullable<Awaited<ReturnType<typeof getSong>>>;
export type GetSongQueryError = ErrorType<void>;
/**
 * @summary Get a song by ID
 */
export declare function useGetSong<TData = Awaited<ReturnType<typeof getSong>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSong>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update a song
 */
export declare const getUpdateSongUrl: (id: number) => string;
export declare const updateSong: (id: number, updateSongBody: UpdateSongBody, options?: RequestInit) => Promise<Song>;
export declare const getUpdateSongMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSong>>, TError, {
        id: number;
        data: BodyType<UpdateSongBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateSong>>, TError, {
    id: number;
    data: BodyType<UpdateSongBody>;
}, TContext>;
export type UpdateSongMutationResult = NonNullable<Awaited<ReturnType<typeof updateSong>>>;
export type UpdateSongMutationBody = BodyType<UpdateSongBody>;
export type UpdateSongMutationError = ErrorType<void>;
/**
 * @summary Update a song
 */
export declare const useUpdateSong: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSong>>, TError, {
        id: number;
        data: BodyType<UpdateSongBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateSong>>, TError, {
    id: number;
    data: BodyType<UpdateSongBody>;
}, TContext>;
/**
 * @summary Delete a song
 */
export declare const getDeleteSongUrl: (id: number) => string;
export declare const deleteSong: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteSongMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteSong>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteSong>>, TError, {
    id: number;
}, TContext>;
export type DeleteSongMutationResult = NonNullable<Awaited<ReturnType<typeof deleteSong>>>;
export type DeleteSongMutationError = ErrorType<unknown>;
/**
 * @summary Delete a song
 */
export declare const useDeleteSong: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteSong>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteSong>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Get songs grouped by category with counts
 */
export declare const getGetSongCategoriesUrl: () => string;
export declare const getSongCategories: (options?: RequestInit) => Promise<SongCategoryGroup[]>;
export declare const getGetSongCategoriesQueryKey: () => readonly ["/api/songs/categories"];
export declare const getGetSongCategoriesQueryOptions: <TData = Awaited<ReturnType<typeof getSongCategories>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSongCategories>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSongCategories>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSongCategoriesQueryResult = NonNullable<Awaited<ReturnType<typeof getSongCategories>>>;
export type GetSongCategoriesQueryError = ErrorType<unknown>;
/**
 * @summary Get songs grouped by category with counts
 */
export declare function useGetSongCategories<TData = Awaited<ReturnType<typeof getSongCategories>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSongCategories>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List events
 */
export declare const getListEventsUrl: (params?: ListEventsParams) => string;
export declare const listEvents: (params?: ListEventsParams, options?: RequestInit) => Promise<Event[]>;
export declare const getListEventsQueryKey: (params?: ListEventsParams) => readonly ["/api/events", ...ListEventsParams[]];
export declare const getListEventsQueryOptions: <TData = Awaited<ReturnType<typeof listEvents>>, TError = ErrorType<unknown>>(params?: ListEventsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listEvents>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListEventsQueryResult = NonNullable<Awaited<ReturnType<typeof listEvents>>>;
export type ListEventsQueryError = ErrorType<unknown>;
/**
 * @summary List events
 */
export declare function useListEvents<TData = Awaited<ReturnType<typeof listEvents>>, TError = ErrorType<unknown>>(params?: ListEventsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new event
 */
export declare const getCreateEventUrl: () => string;
export declare const createEvent: (createEventBody: CreateEventBody, options?: RequestInit) => Promise<Event>;
export declare const getCreateEventMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createEvent>>, TError, {
        data: BodyType<CreateEventBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createEvent>>, TError, {
    data: BodyType<CreateEventBody>;
}, TContext>;
export type CreateEventMutationResult = NonNullable<Awaited<ReturnType<typeof createEvent>>>;
export type CreateEventMutationBody = BodyType<CreateEventBody>;
export type CreateEventMutationError = ErrorType<unknown>;
/**
 * @summary Create a new event
 */
export declare const useCreateEvent: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createEvent>>, TError, {
        data: BodyType<CreateEventBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createEvent>>, TError, {
    data: BodyType<CreateEventBody>;
}, TContext>;
/**
 * @summary Get upcoming events (next 30 days)
 */
export declare const getGetUpcomingEventsUrl: () => string;
export declare const getUpcomingEvents: (options?: RequestInit) => Promise<Event[]>;
export declare const getGetUpcomingEventsQueryKey: () => readonly ["/api/events/upcoming"];
export declare const getGetUpcomingEventsQueryOptions: <TData = Awaited<ReturnType<typeof getUpcomingEvents>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUpcomingEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getUpcomingEvents>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetUpcomingEventsQueryResult = NonNullable<Awaited<ReturnType<typeof getUpcomingEvents>>>;
export type GetUpcomingEventsQueryError = ErrorType<unknown>;
/**
 * @summary Get upcoming events (next 30 days)
 */
export declare function useGetUpcomingEvents<TData = Awaited<ReturnType<typeof getUpcomingEvents>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getUpcomingEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get an event by ID
 */
export declare const getGetEventUrl: (id: number) => string;
export declare const getEvent: (id: number, options?: RequestInit) => Promise<Event>;
export declare const getGetEventQueryKey: (id: number) => readonly [`/api/events/${number}`];
export declare const getGetEventQueryOptions: <TData = Awaited<ReturnType<typeof getEvent>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getEvent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getEvent>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetEventQueryResult = NonNullable<Awaited<ReturnType<typeof getEvent>>>;
export type GetEventQueryError = ErrorType<void>;
/**
 * @summary Get an event by ID
 */
export declare function useGetEvent<TData = Awaited<ReturnType<typeof getEvent>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getEvent>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update an event
 */
export declare const getUpdateEventUrl: (id: number) => string;
export declare const updateEvent: (id: number, updateEventBody: UpdateEventBody, options?: RequestInit) => Promise<Event>;
export declare const getUpdateEventMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateEvent>>, TError, {
        id: number;
        data: BodyType<UpdateEventBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateEvent>>, TError, {
    id: number;
    data: BodyType<UpdateEventBody>;
}, TContext>;
export type UpdateEventMutationResult = NonNullable<Awaited<ReturnType<typeof updateEvent>>>;
export type UpdateEventMutationBody = BodyType<UpdateEventBody>;
export type UpdateEventMutationError = ErrorType<void>;
/**
 * @summary Update an event
 */
export declare const useUpdateEvent: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateEvent>>, TError, {
        id: number;
        data: BodyType<UpdateEventBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateEvent>>, TError, {
    id: number;
    data: BodyType<UpdateEventBody>;
}, TContext>;
/**
 * @summary Delete an event
 */
export declare const getDeleteEventUrl: (id: number) => string;
export declare const deleteEvent: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteEventMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteEvent>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteEvent>>, TError, {
    id: number;
}, TContext>;
export type DeleteEventMutationResult = NonNullable<Awaited<ReturnType<typeof deleteEvent>>>;
export type DeleteEventMutationError = ErrorType<unknown>;
/**
 * @summary Delete an event
 */
export declare const useDeleteEvent: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteEvent>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteEvent>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Get setlist songs for an event
 */
export declare const getGetEventSetlistUrl: (id: number) => string;
export declare const getEventSetlist: (id: number, options?: RequestInit) => Promise<Song[]>;
export declare const getGetEventSetlistQueryKey: (id: number) => readonly [`/api/events/${number}/setlist`];
export declare const getGetEventSetlistQueryOptions: <TData = Awaited<ReturnType<typeof getEventSetlist>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getEventSetlist>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getEventSetlist>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetEventSetlistQueryResult = NonNullable<Awaited<ReturnType<typeof getEventSetlist>>>;
export type GetEventSetlistQueryError = ErrorType<unknown>;
/**
 * @summary Get setlist songs for an event
 */
export declare function useGetEventSetlist<TData = Awaited<ReturnType<typeof getEventSetlist>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getEventSetlist>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Replace the setlist for an event
 */
export declare const getUpdateEventSetlistUrl: (id: number) => string;
export declare const updateEventSetlist: (id: number, updateSetlistBody: UpdateSetlistBody, options?: RequestInit) => Promise<Song[]>;
export declare const getUpdateEventSetlistMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateEventSetlist>>, TError, {
        id: number;
        data: BodyType<UpdateSetlistBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateEventSetlist>>, TError, {
    id: number;
    data: BodyType<UpdateSetlistBody>;
}, TContext>;
export type UpdateEventSetlistMutationResult = NonNullable<Awaited<ReturnType<typeof updateEventSetlist>>>;
export type UpdateEventSetlistMutationBody = BodyType<UpdateSetlistBody>;
export type UpdateEventSetlistMutationError = ErrorType<unknown>;
/**
 * @summary Replace the setlist for an event
 */
export declare const useUpdateEventSetlist: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateEventSetlist>>, TError, {
        id: number;
        data: BodyType<UpdateSetlistBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateEventSetlist>>, TError, {
    id: number;
    data: BodyType<UpdateSetlistBody>;
}, TContext>;
/**
 * @summary List attendances for an event
 */
export declare const getListEventAttendancesUrl: (id: number) => string;
export declare const listEventAttendances: (id: number, options?: RequestInit) => Promise<EventAttendance[]>;
export declare const getListEventAttendancesQueryKey: (id: number) => readonly [`/api/events/${number}/attendances`];
export declare const getListEventAttendancesQueryOptions: <TData = Awaited<ReturnType<typeof listEventAttendances>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listEventAttendances>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listEventAttendances>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListEventAttendancesQueryResult = NonNullable<Awaited<ReturnType<typeof listEventAttendances>>>;
export type ListEventAttendancesQueryError = ErrorType<unknown>;
/**
 * @summary List attendances for an event
 */
export declare function useListEventAttendances<TData = Awaited<ReturnType<typeof listEventAttendances>>, TError = ErrorType<unknown>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listEventAttendances>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Confirm or decline attendance for an event
 */
export declare const getUpsertEventAttendanceUrl: (id: number) => string;
export declare const upsertEventAttendance: (id: number, upsertAttendanceBody: UpsertAttendanceBody, options?: RequestInit) => Promise<EventAttendance>;
export declare const getUpsertEventAttendanceMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof upsertEventAttendance>>, TError, {
        id: number;
        data: BodyType<UpsertAttendanceBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof upsertEventAttendance>>, TError, {
    id: number;
    data: BodyType<UpsertAttendanceBody>;
}, TContext>;
export type UpsertEventAttendanceMutationResult = NonNullable<Awaited<ReturnType<typeof upsertEventAttendance>>>;
export type UpsertEventAttendanceMutationBody = BodyType<UpsertAttendanceBody>;
export type UpsertEventAttendanceMutationError = ErrorType<unknown>;
/**
 * @summary Confirm or decline attendance for an event
 */
export declare const useUpsertEventAttendance: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof upsertEventAttendance>>, TError, {
        id: number;
        data: BodyType<UpsertAttendanceBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof upsertEventAttendance>>, TError, {
    id: number;
    data: BodyType<UpsertAttendanceBody>;
}, TContext>;
/**
 * @summary List all announcements
 */
export declare const getListAnnouncementsUrl: () => string;
export declare const listAnnouncements: (options?: RequestInit) => Promise<Announcement[]>;
export declare const getListAnnouncementsQueryKey: () => readonly ["/api/announcements"];
export declare const getListAnnouncementsQueryOptions: <TData = Awaited<ReturnType<typeof listAnnouncements>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAnnouncements>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAnnouncements>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAnnouncementsQueryResult = NonNullable<Awaited<ReturnType<typeof listAnnouncements>>>;
export type ListAnnouncementsQueryError = ErrorType<unknown>;
/**
 * @summary List all announcements
 */
export declare function useListAnnouncements<TData = Awaited<ReturnType<typeof listAnnouncements>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAnnouncements>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create an announcement
 */
export declare const getCreateAnnouncementUrl: () => string;
export declare const createAnnouncement: (createAnnouncementBody: CreateAnnouncementBody, options?: RequestInit) => Promise<Announcement>;
export declare const getCreateAnnouncementMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAnnouncement>>, TError, {
        data: BodyType<CreateAnnouncementBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAnnouncement>>, TError, {
    data: BodyType<CreateAnnouncementBody>;
}, TContext>;
export type CreateAnnouncementMutationResult = NonNullable<Awaited<ReturnType<typeof createAnnouncement>>>;
export type CreateAnnouncementMutationBody = BodyType<CreateAnnouncementBody>;
export type CreateAnnouncementMutationError = ErrorType<unknown>;
/**
 * @summary Create an announcement
 */
export declare const useCreateAnnouncement: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAnnouncement>>, TError, {
        data: BodyType<CreateAnnouncementBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAnnouncement>>, TError, {
    data: BodyType<CreateAnnouncementBody>;
}, TContext>;
/**
 * @summary Update an announcement
 */
export declare const getUpdateAnnouncementUrl: (id: number) => string;
export declare const updateAnnouncement: (id: number, updateAnnouncementBody: UpdateAnnouncementBody, options?: RequestInit) => Promise<Announcement>;
export declare const getUpdateAnnouncementMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAnnouncement>>, TError, {
        id: number;
        data: BodyType<UpdateAnnouncementBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateAnnouncement>>, TError, {
    id: number;
    data: BodyType<UpdateAnnouncementBody>;
}, TContext>;
export type UpdateAnnouncementMutationResult = NonNullable<Awaited<ReturnType<typeof updateAnnouncement>>>;
export type UpdateAnnouncementMutationBody = BodyType<UpdateAnnouncementBody>;
export type UpdateAnnouncementMutationError = ErrorType<void>;
/**
 * @summary Update an announcement
 */
export declare const useUpdateAnnouncement: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateAnnouncement>>, TError, {
        id: number;
        data: BodyType<UpdateAnnouncementBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateAnnouncement>>, TError, {
    id: number;
    data: BodyType<UpdateAnnouncementBody>;
}, TContext>;
/**
 * @summary Delete an announcement
 */
export declare const getDeleteAnnouncementUrl: (id: number) => string;
export declare const deleteAnnouncement: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteAnnouncementMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAnnouncement>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteAnnouncement>>, TError, {
    id: number;
}, TContext>;
export type DeleteAnnouncementMutationResult = NonNullable<Awaited<ReturnType<typeof deleteAnnouncement>>>;
export type DeleteAnnouncementMutationError = ErrorType<unknown>;
/**
 * @summary Delete an announcement
 */
export declare const useDeleteAnnouncement: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteAnnouncement>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteAnnouncement>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Get dashboard summary data
 */
export declare const getGetDashboardUrl: () => string;
export declare const getDashboard: (options?: RequestInit) => Promise<Dashboard>;
export declare const getGetDashboardQueryKey: () => readonly ["/api/dashboard"];
export declare const getGetDashboardQueryOptions: <TData = Awaited<ReturnType<typeof getDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboard>>>;
export type GetDashboardQueryError = ErrorType<unknown>;
/**
 * @summary Get dashboard summary data
 */
export declare function useGetDashboard<TData = Awaited<ReturnType<typeof getDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get coral branding settings (logo and signature)
 */
export declare const getGetSettingsUrl: () => string;
export declare const getSettings: (options?: RequestInit) => Promise<CoralSettings>;
export declare const getGetSettingsQueryKey: () => readonly ["/api/settings"];
export declare const getGetSettingsQueryOptions: <TData = Awaited<ReturnType<typeof getSettings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetSettingsQueryResult = NonNullable<Awaited<ReturnType<typeof getSettings>>>;
export type GetSettingsQueryError = ErrorType<unknown>;
/**
 * @summary Get coral branding settings (logo and signature)
 */
export declare function useGetSettings<TData = Awaited<ReturnType<typeof getSettings>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getSettings>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Update coral branding settings
 */
export declare const getUpdateSettingsUrl: () => string;
export declare const updateSettings: (updateSettingsBody: UpdateSettingsBody, options?: RequestInit) => Promise<CoralSettings>;
export declare const getUpdateSettingsMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSettings>>, TError, {
        data: BodyType<UpdateSettingsBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateSettings>>, TError, {
    data: BodyType<UpdateSettingsBody>;
}, TContext>;
export type UpdateSettingsMutationResult = NonNullable<Awaited<ReturnType<typeof updateSettings>>>;
export type UpdateSettingsMutationBody = BodyType<UpdateSettingsBody>;
export type UpdateSettingsMutationError = ErrorType<unknown>;
/**
 * @summary Update coral branding settings
 */
export declare const useUpdateSettings: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateSettings>>, TError, {
        data: BodyType<UpdateSettingsBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateSettings>>, TError, {
    data: BodyType<UpdateSettingsBody>;
}, TContext>;
/**
 * @summary List all study materials
 */
export declare const getListStudyMaterialsUrl: () => string;
export declare const listStudyMaterials: (options?: RequestInit) => Promise<StudyMaterial[]>;
export declare const getListStudyMaterialsQueryKey: () => readonly ["/api/study-materials"];
export declare const getListStudyMaterialsQueryOptions: <TData = Awaited<ReturnType<typeof listStudyMaterials>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStudyMaterials>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listStudyMaterials>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListStudyMaterialsQueryResult = NonNullable<Awaited<ReturnType<typeof listStudyMaterials>>>;
export type ListStudyMaterialsQueryError = ErrorType<unknown>;
/**
 * @summary List all study materials
 */
export declare function useListStudyMaterials<TData = Awaited<ReturnType<typeof listStudyMaterials>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listStudyMaterials>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a study material
 */
export declare const getCreateStudyMaterialUrl: () => string;
export declare const createStudyMaterial: (createStudyMaterialBody: CreateStudyMaterialBody, options?: RequestInit) => Promise<StudyMaterial>;
export declare const getCreateStudyMaterialMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createStudyMaterial>>, TError, {
        data: BodyType<CreateStudyMaterialBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createStudyMaterial>>, TError, {
    data: BodyType<CreateStudyMaterialBody>;
}, TContext>;
export type CreateStudyMaterialMutationResult = NonNullable<Awaited<ReturnType<typeof createStudyMaterial>>>;
export type CreateStudyMaterialMutationBody = BodyType<CreateStudyMaterialBody>;
export type CreateStudyMaterialMutationError = ErrorType<unknown>;
/**
 * @summary Create a study material
 */
export declare const useCreateStudyMaterial: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createStudyMaterial>>, TError, {
        data: BodyType<CreateStudyMaterialBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createStudyMaterial>>, TError, {
    data: BodyType<CreateStudyMaterialBody>;
}, TContext>;
/**
 * @summary Update a study material
 */
export declare const getUpdateStudyMaterialUrl: (id: number) => string;
export declare const updateStudyMaterial: (id: number, updateStudyMaterialBody: UpdateStudyMaterialBody, options?: RequestInit) => Promise<StudyMaterial>;
export declare const getUpdateStudyMaterialMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateStudyMaterial>>, TError, {
        id: number;
        data: BodyType<UpdateStudyMaterialBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof updateStudyMaterial>>, TError, {
    id: number;
    data: BodyType<UpdateStudyMaterialBody>;
}, TContext>;
export type UpdateStudyMaterialMutationResult = NonNullable<Awaited<ReturnType<typeof updateStudyMaterial>>>;
export type UpdateStudyMaterialMutationBody = BodyType<UpdateStudyMaterialBody>;
export type UpdateStudyMaterialMutationError = ErrorType<unknown>;
/**
 * @summary Update a study material
 */
export declare const useUpdateStudyMaterial: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateStudyMaterial>>, TError, {
        id: number;
        data: BodyType<UpdateStudyMaterialBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof updateStudyMaterial>>, TError, {
    id: number;
    data: BodyType<UpdateStudyMaterialBody>;
}, TContext>;
/**
 * @summary Delete a study material
 */
export declare const getDeleteStudyMaterialUrl: (id: number) => string;
export declare const deleteStudyMaterial: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteStudyMaterialMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteStudyMaterial>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteStudyMaterial>>, TError, {
    id: number;
}, TContext>;
export type DeleteStudyMaterialMutationResult = NonNullable<Awaited<ReturnType<typeof deleteStudyMaterial>>>;
export type DeleteStudyMaterialMutationError = ErrorType<unknown>;
/**
 * @summary Delete a study material
 */
export declare const useDeleteStudyMaterial: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteStudyMaterial>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteStudyMaterial>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary Record a corista app access
 */
export declare const getCreateAccessLogUrl: () => string;
export declare const createAccessLog: (createAccessLogBody: CreateAccessLogBody, options?: RequestInit) => Promise<AccessLog>;
export declare const getCreateAccessLogMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAccessLog>>, TError, {
        data: BodyType<CreateAccessLogBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createAccessLog>>, TError, {
    data: BodyType<CreateAccessLogBody>;
}, TContext>;
export type CreateAccessLogMutationResult = NonNullable<Awaited<ReturnType<typeof createAccessLog>>>;
export type CreateAccessLogMutationBody = BodyType<CreateAccessLogBody>;
export type CreateAccessLogMutationError = ErrorType<unknown>;
/**
 * @summary Record a corista app access
 */
export declare const useCreateAccessLog: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createAccessLog>>, TError, {
        data: BodyType<CreateAccessLogBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createAccessLog>>, TError, {
    data: BodyType<CreateAccessLogBody>;
}, TContext>;
/**
 * @summary List recent access log entries
 */
export declare const getListAccessLogsUrl: () => string;
export declare const listAccessLogs: (options?: RequestInit) => Promise<AccessLog[]>;
export declare const getListAccessLogsQueryKey: () => readonly ["/api/access-logs"];
export declare const getListAccessLogsQueryOptions: <TData = Awaited<ReturnType<typeof listAccessLogs>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAccessLogs>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAccessLogs>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAccessLogsQueryResult = NonNullable<Awaited<ReturnType<typeof listAccessLogs>>>;
export type ListAccessLogsQueryError = ErrorType<unknown>;
/**
 * @summary List recent access log entries
 */
export declare function useListAccessLogs<TData = Awaited<ReturnType<typeof listAccessLogs>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAccessLogs>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Access frequency summary per corista
 */
export declare const getGetAccessLogsSummaryUrl: () => string;
export declare const getAccessLogsSummary: (options?: RequestInit) => Promise<AccessLogSummary[]>;
export declare const getGetAccessLogsSummaryQueryKey: () => readonly ["/api/access-logs/summary"];
export declare const getGetAccessLogsSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getAccessLogsSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAccessLogsSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAccessLogsSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAccessLogsSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getAccessLogsSummary>>>;
export type GetAccessLogsSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Access frequency summary per corista
 */
export declare function useGetAccessLogsSummary<TData = Awaited<ReturnType<typeof getAccessLogsSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAccessLogsSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map