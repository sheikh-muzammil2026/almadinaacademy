"use client";

import Image from "next/image";

export default function RoutinePreview({ routine }) {
    if (!routine) {
        return (
            <div className="p-8 text-center text-gray-500 font-medium">
                কোনো প্রিভিউ ডেটা পাওয়া যায়নি!
            </div>
        );
    }
    const handlePrint = () => {
        window.print();
    };



    const dateCount = routine.dates?.length || 1;

    // তারিখের সংখ্যার ওপর ভিত্তি করে ডাইনামিক ফন্ট ও প্যাডিং ক্লাস সেট করা
    const getDynamicTextSize = () => {
        if (dateCount > 12) return "text-[9px] print:text-[8px] px-0.5 py-2 print:px-0.5 print:py-1.5";
        if (dateCount > 8) return "text-[10px] print:text-[9px] px-1 py-2.5 print:px-0.5 print:py-2";
        return "text-xs print:text-[11px] px-1.5 py-3 print:px-1 print:py-2.5";
    };

    const textSizeClass = getDynamicTextSize();

    return (
        <div className="bg-white p-4 max-w-[1400px] mx-auto shadow-sm rounded-lg border border-gray-100">
            {/* Non-Printable Action Header */}
            <div className="flex justify-between items-center mb-4 print:hidden bg-gray-50 border border-gray-200 p-4 rounded-md">
                <div>
                    <h2 className="font-bold text-gray-800 text-lg">রুটিন লাইভ প্রিভিউ</h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                        প্রিন্ট বা পিডিএফ ডাউনলোডের আগে প্রিভিউ দেখে নিন
                    </p>
                </div>
                {/* Print and Download Buttons */}
                <div className="flex items-center gap-3">


                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-md shadow-sm transition-all text-sm active:scale-95"
                    >
                        <span>🖨️</span> Print
                    </button>
                </div>
            </div>

            {/* Printable Routine Layout */}
            <div id="printable" className="p-2 print:p-0 w-full mx-auto flex flex-col justify-between min-h-[90vh] print:min-h-[190mm]">
                <div>
                    {/* Header with Logo and 3-Language Typography */}
                    <div className="flex items-center justify-center gap-4 mb-2 border-b-4 border-double border-gray-800 pb-2 px-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 bg-white relative flex items-center justify-center border border-emerald-600">
                            <Image
                                src={"/madrasah-logo.jpeg"}
                                alt="Madrasah Logo"
                                width={120}
                                height={120}
                                quality={100}
                                priority
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="flex-grow text-center flex flex-col justify-center">
                            <p className="text-xs md:text-sm font-semibold text-emerald-800 font-serif" dir="rtl">
                                أكاديمية المدينة الإسلامية
                            </p>
                            <h1 className="text-xl md:text-3xl font-black text-gray-900 leading-tight">
                                আল-মদিনা ইসলামিক একাডেমি
                            </h1>
                            <h2 className="text-xs md:text-sm font-extrabold text-[#C02626] tracking-wider uppercase">
                                AL-MADINA ISLAMIC ACADEMY
                            </h2>
                            <p className="text-[10px] md:text-xs font-medium text-gray-600 mt-0.5">
                                বড় বাকাইল, সুহিলপুর, সদর, ব্রাহ্মণবাড়িয়া
                            </p>
                        </div>
                    </div>

                    {/* Title Header */}
                    <div className="text-center mb-3 space-y-0.5">
                        <h3 className="text-xs md:text-sm font-bold text-gray-800">
                            <span>{routine.examTitle}</span> - {(routine.gregorianYear || '').split(/[-–/]/)[0].trim()} ঈসায়ী /{" "}
                            {(routine.hijriYear || '').split(/[-–/]/)[0].trim()} হি
                        </h3>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
                            পরীক্ষার রুটিন
                        </h2>
                    </div>

                    {/* Table Matrix */}
                    <div className="w-full overflow-hidden">
                        <table className="w-full h-full border-collapse border border-gray-800 text-gray-900 table-fixed">
                            <thead>
                                <tr className="bg-gray-200 text-center font-bold print:bg-gray-200">
                                    <th className={`border border-gray-800 text-center w-[60px] md:w-[80px] ${textSizeClass}`}>
                                        শ্রেণি
                                    </th>
                                    {routine.dates?.map((d) => (
                                        <th
                                            key={d.id}
                                            className={`border border-gray-800 text-center ${textSizeClass}`}
                                        >
                                            <div className="truncate">{d.gregorian || "—"}</div>
                                            <div className="mt-0.5 font-semibold text-gray-800 truncate">
                                                {d.day}
                                            </div>
                                            <hr className="border-gray-800 my-0.5" />
                                            <div className="font-bold truncate">{d.hijri || "—"}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {routine.routineData?.map((row, index) => (
                                    <tr key={index} className="text-center hover:bg-gray-50">
                                        <td className={`border border-gray-800 font-bold bg-gray-100 text-center print:bg-gray-100 ${textSizeClass}`}>
                                            {row.class || row.jamaat}
                                        </td>
                                        {routine.dates?.map((d) => (
                                            <td
                                                key={d.id}
                                                className={`border border-gray-800 font-medium break-all whitespace-normal ${textSizeClass}`}
                                            >
                                                {row.subjects?.[d.id] || "—"}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Note Footer */}
                    <div className="mt-3 p-1.5 border-l-4 text-center border-gray-800 bg-gray-50 text-[11px] print:text-[10px] font-semibold text-gray-900 leading-snug print:bg-transparent print:p-0 print:border-none space-y-0.5">
                        <p>বিশেষ দ্রষ্টব্য: সকল বিভাগের পরীক্ষার সময় <span className="text-amber-600">সকাল ৯:০০ থেকে ১১:৩০ মিনিট </span> পর্যন্ত।</p>
                        <p className="">১২ই রবিউল আওয়াল উপলক্ষে ২৬ আগস্ট রোজ বুধবার শিক্ষা কার্যক্রম বন্ধ থাকবে।</p>
                    </div>
                </div>

                {/* Principal Signature Section */}
                <div className="mt-6 pt-4 flex justify-end items-end print:mt-auto relative">
                    <div className="text-center w-48">
                        <Image
                            src="/principle's_signature.jpg"
                            alt="Principal Signature"
                            width={150}
                            height={60}
                            unoptimized
                            className="absolute -top-8 right-14 h-9 w-17 object-contain mix-blend-multiply contrast-[800%] brightness-[80%] grayscale -rotate-45"
                        />
                        <div className="border-t border-gray-800 pt-1 font-bold text-xs text-gray-900 max-w-[100px] mx-auto">
                            প্রিন্সিপাল
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Printing & Page Styles */}
            <style jsx global>{`
                @media print {
                    @page {
                        size: A4 landscape;
                        margin: 5mm;
                    }

                    body {
                        background-color: #ffffff !important;
                        color: #000000 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    body * {
                        visibility: hidden;
                    }

                    #printable,
                    #printable * {
                        visibility: visible;
                    }

                    #printable {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }

                    table {
                        width: 100% !important;
                        table-layout: fixed !important;
                    }

                    th, td {
                        word-break: break-word !important;
                        overflow-wrap: break-word !important;
                    }
                }
            `}</style>
        </div>
    );
}
