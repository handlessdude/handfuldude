export async function attempt(
  exec: Function,
  onSuccess: Function,
  onError: Function
) {
  let result;
  try {
    result = await exec();
  } catch (err) {
    onError(err);
    return;
  }
  onSuccess();
  return result;
}
