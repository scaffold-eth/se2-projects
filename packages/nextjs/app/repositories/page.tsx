"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownTrayIcon, ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Repository } from "~~/types/repository";

interface RepositoriesResponse {
  repositories: Repository[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  sorting: { sortBy: string; sortOrder: string };
  search: string;
}

const RepositoriesPage = () => {
  const [data, setData] = useState<RepositoriesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("stars");
  const [sortOrder, setSortOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const fetchRepositories = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "30",
        sortBy,
        sortOrder,
        ...(debouncedSearch && { search: debouncedSearch }),
      });
      const response = await fetch(`/api/repositories?${params}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
      setIsInitialLoad(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 400);
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [search]);

  useEffect(() => {
    fetchRepositories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sortBy, sortOrder, debouncedSearch]);

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const handleExport = async () => {
    const response = await fetch("/api/repositories/export");
    if (!response.ok) return;
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `repositories-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const SortHeader = ({ field, label, align = "left" }: { field: string; label: string; align?: "left" | "right" }) => (
    <th className={align === "right" ? "text-right" : ""}>
      <button
        onClick={() => toggleSort(field)}
        className={`inline-flex items-center gap-1 hover:text-base-content transition-colors ${
          sortBy === field ? "text-base-content" : ""
        } ${align === "right" ? "flex-row-reverse" : ""}`}
      >
        {label}
        {sortBy === field &&
          (sortOrder === "asc" ? <ChevronUpIcon className="w-3 h-3" /> : <ChevronDownIcon className="w-3 h-3" />)}
      </button>
    </th>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-error mb-2">Failed to load repositories</p>
          <p className="text-sm text-base-content/50">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="loading loading-spinner loading-lg text-base-content/30"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Repositories</h1>
          <p className="text-base-content/50">
            {data.pagination.totalCount.toLocaleString()} projects using Scaffold-ETH
          </p>
        </div>
        <button onClick={handleExport} className="btn btn-sm btn-ghost gap-2 self-start sm:self-auto">
          <ArrowDownTrayIcon className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input input-bordered w-full pl-10 bg-base-100"
          />
          {loading && !isInitialLoad && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="loading loading-spinner loading-xs"></div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div
        className={`bg-base-100 rounded-xl border border-base-200 overflow-hidden transition-opacity ${loading && !isInitialLoad ? "opacity-60" : ""}`}
      >
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-base-200">
                <SortHeader field="name" label="Repository" />
                <SortHeader field="owner" label="Owner" />
                <SortHeader field="stars" label="Stars" align="right" />
                <SortHeader field="forks" label="Forks" align="right" />
                <th className="hidden lg:table-cell">
                  <button
                    onClick={() => toggleSort("created_at")}
                    className={`inline-flex items-center gap-1 hover:text-base-content transition-colors ${
                      sortBy === "created_at" ? "text-base-content" : ""
                    }`}
                  >
                    Created
                    {sortBy === "created_at" &&
                      (sortOrder === "asc" ? (
                        <ChevronUpIcon className="w-3 h-3" />
                      ) : (
                        <ChevronDownIcon className="w-3 h-3" />
                      ))}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.repositories.map(repo => (
                <tr key={repo.id} className="hover:bg-base-200/50 border-b border-base-200 last:border-0">
                  <td>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-accent transition-colors"
                    >
                      {repo.name}
                    </a>
                    <div className="text-xs text-base-content/40 mt-0.5">{repo.full_name}</div>
                  </td>
                  <td className="text-base-content/70">{repo.owner}</td>
                  <td className="text-right font-mono">{repo.stars.toLocaleString()}</td>
                  <td className="text-right font-mono text-base-content/50">{repo.forks.toLocaleString()}</td>
                  <td className="hidden lg:table-cell text-base-content/40 text-sm">
                    {new Date(repo.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-sm text-base-content/40">
          Page {data.pagination.currentPage} of {data.pagination.totalPages}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={!data.pagination.hasPrev}
            className="btn btn-sm btn-ghost disabled:opacity-30"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={!data.pagination.hasPrev}
            className="btn btn-sm btn-ghost disabled:opacity-30"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={!data.pagination.hasNext}
            className="btn btn-sm btn-ghost disabled:opacity-30"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(data.pagination.totalPages)}
            disabled={!data.pagination.hasNext}
            className="btn btn-sm btn-ghost disabled:opacity-30"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default RepositoriesPage;
