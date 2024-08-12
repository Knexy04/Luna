"use client";
export default function Error({error}: {error: Error}) {

    console.log(error)

    return (
        <div className={"w-full h-screen flex justify-center items-center"}>
            Упс! {error.message}
        </div>
    )
}