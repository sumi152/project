export interface BFHLRequest {
  data: string[];
  file_b64?: string;
}

export interface BFHLResponse {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: string[];
  alphabets: string[];
  highest_lowercase_alphabet: string[];
  is_prime_found: boolean;
  file_valid: boolean;
  file_mime_type?: string;
  file_size_kb?: string;
}

export interface FilterOption {
  value: keyof Pick<BFHLResponse, 'numbers' | 'alphabets' | 'highest_lowercase_alphabet'>;
  label: string;
}